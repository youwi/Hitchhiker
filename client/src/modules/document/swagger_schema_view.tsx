import React from 'react';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

interface SwaggerDefinitionsProps {
    definitions:any[];
    schema:any;
}

interface SwaggerDefinitionsDispatchProps { }

type SwaggerParamProps = SwaggerDefinitionsProps & SwaggerDefinitionsDispatchProps;

interface SwaggerParamState { }

class SwaggerSchemaView extends React.Component<SwaggerParamProps, SwaggerParamState> {
    public render() {
        let{ schema,definitions}=this.props
        let schemaName="";

        if(schema.type){
            return <div>{schema.type}</div>
        }
        //get real object
        if(schema.$ref){
            //"#/definitions/VBdAccountScore" .substring(14)=>VBdAccountScore
            schemaName=schema.$ref.substring(14)
            schema=definitions[schema.$ref.substring(14)]
        }


        let prefix=""
        let subfix=""
        let retips=" // "
        let splitTag=" : "
        let splitCom=", "
        if(schema.type=='object'){
            prefix=" {  "
            if(schema.definitions) prefix+="//"+schema.description
            subfix=" } "
        }else if(schema.type=='array'){
            prefix=" [ "
            if(schema.definitions) prefix+="//"+schema.description
            subfix=" ] "
        }
        let example={}
        Object.keys(schema.properties).map((key)=>{

            if( schema.properties[key].type=="string")
                example[key]="string"
            if( schema.properties[key].type=='integer')
                example[key]=0
            if( schema.properties[key].type=='array')
                example[key]=[]
        })

         return (<div>
                 <Tabs defaultActiveKey="1" size="small" className="fix-swagger-schema-tab">
                     <TabPane tab="Modal" key="1">
                         <span className="link">{schemaName}</span>
                         {prefix}
                         <i className="h-icon-link link"/>
                         <div className="param-container">
                             {
                                 Object.keys(schema.properties).map((key,index)=><div className="param-name" key={index}>
                                     <span className="param-key">{key}</span>
                                     <span className="param-split">{splitTag}</span>
                                     <span className="param-type">{ schema.properties[key].type}</span>
                                     <span className="param-description">{schema.properties[key].description!=null?retips:""}</span>
                                     <span className="param-description">{ schema.properties[key].description}</span>
                                 </div>)
                             }
                         </div>
                         {subfix}
                     </TabPane>
                     <TabPane tab="example" key="2">
                         <pre>
                             {
                                    JSON.stringify(example,null,4)
                             }
                         </pre>
                     </TabPane>
                 </Tabs>


            </div>
        )

    }
}

export default SwaggerSchemaView;
