import * as lambdaNodeJS from 'aws-cdk-lib/aws-lambda-nodejs';
import * as cdk from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway'
import * as cwlogs from "aws-cdk-lib/aws-logs"

import { Construct } from 'constructs';

interface ECommerceApiStackPros extends cdk.StackProps {
	productsFetchHandler : lambdaNodeJS.NodejsFunction
}

export class ECommerceAwsQueue extends cdk.Stack {

	constructor(scope : Construct, id: string, props: ECommerceApiStackPros) {
		super(scope, id, props)
		
		const api = new apigateway.RestApi(this, "ECommerceApi", {
			restApiName : "ECommerceApi",
		})

		const productsFetchIntegration = new apigateway.LambdaIntegration(props.productsFetchHandler)

		// /products
		const productsResource = api.root.addResource('products')

		productsResource.addMethod("GET", productsFetchIntegration)
	}
}