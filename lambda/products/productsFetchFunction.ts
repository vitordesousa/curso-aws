import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

export async function handler(
			event: APIGatewayProxyEvent, 
			context: Context
		): Promise <APIGatewayProxyResult> {

		const lambdaRequestId = context.awsRequestId
		const ApiRequestId = event.requestContext.requestId

		console.log(`lambdaRequestId: ${lambdaRequestId}.  ApiRequestId:  ${ApiRequestId}`)

		const method = event.httpMethod as string;

		if(event.resource === '/products'){
			if(method === 'GET'){
				console.log('GET','OK');

				return {
					statusCode : 200,
					body: JSON.stringify({
						message: "GET Products - OK",
					})
				}
			}
		}

		return {
			statusCode : 400,
			body: JSON.stringify({
				message: "Bad Request"
			})
		}
}