const dialogflow = require('dialogflow');
const { struct } = require('pb-util');  

const projectId = 'workers-rights-293118';
const sessionClient = new dialogflow.SessionsClient();
const contextsClient = new dialogflow.ContextsClient();

function sendQuery(sessionId, query, context) {

    const session = sessionClient.sessionPath(projectId, sessionId);

    const request = {
        session,
        queryInput: {
            text: {
                text: query,
                languageCode: 'en'
            }
        },
        queryParams: {
            contexts: [context] // You can pass multiple contexts if you wish
        }
    };

    return sessionClient.detectIntent(request);
}



async function createContext(projectId, sessionId, contextId, parameters, lifespanCount = 5) {

    const sessionPath = contextsClient.sessionPath(projectId, sessionId);
    const contextPath = contextsClient.contextPath(
        projectId,
        sessionId,
        contextId
    );

    const request = {
        parent: sessionPath,
        context: {
            name: contextPath,
            // parameters: struct.encode(parameters),
            lifespanCount
        }
    };

    const [context] = await contextsClient.createContext(request);

    return context;
}


(async() => {
    const sessionId = 'my-session';
    context = 'yestoq1didyougettheguide-followup';
    const context = await createContext(projectId, sessionId, context);
    const response = await sendQuery(sessionId, 'No', context);

    console.log(response);

})();