import { NextResponse } from 'next/server';
import { GoogleAuth } from 'google-auth-library';

const auth = new GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/cloud-platform'
});

const PROJECT_ENGINE = '${your-project-engine-url}' //
const DISCOVERY_ENGINE_URL = `https://discoveryengine.googleapis.com/v1alpha/${PROJECT_ENGINE}`;

export async function POST(req) {
    const { query } = await req.json();

    try {
        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Step 1: Perform search to get session ID and query ID
        const searchResponse = await fetch(`${DISCOVERY_ENGINE_URL}/servingConfigs/default_search:search`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                pageSize: 2,
                queryExpansionSpec: { condition: 'AUTO' },
                spellCorrectionSpec: { mode: 'AUTO' },
                contentSearchSpec: {
                    snippetSpec: { returnSnippet: true },
                    extractiveContentSpec: { maxExtractiveAnswerCount: 1 }
                },
                session: `${PROJECT_ENGINE}/sessions/-`
            }),
        });

        if (!searchResponse.ok) {
            throw new Error('Search request failed');
        }

        const searchData = await searchResponse.json();
        const { name: sessionName, queryId } = searchData.sessionInfo;

        // Step 2: Generate answer using session ID and query ID
        const answerResponse = await fetch(`${DISCOVERY_ENGINE_URL}/servingConfigs/default_search:answer`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: {
                    text: query,
                    queryId
                },
                session: sessionName,
                relatedQuestionsSpec: { enable: true },
                answerGenerationSpec: {
                    ignoreAdversarialQuery: true,
                    ignoreNonAnswerSeekingQuery: true,
                    ignoreLowRelevantContent: true,
                    includeCitations: true,
                    modelSpec: { modelVersion: 'preview' }
                }
            }),
        });

        if (!answerResponse.ok) {
            throw new Error('Answer generation request failed');
        }

        const answerData = await answerResponse.json();

        // Process and return the results
        return NextResponse.json({
            answer: answerData.answer.answerText,
            citations: answerData.answer.citations,
            references: answerData.answer.references,
            relatedQuestions: answerData.answer.relatedQuestions
        });
    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}