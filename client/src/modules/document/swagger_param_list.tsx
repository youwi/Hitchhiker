import React from 'react';
import { connect, Dispatch } from 'react-redux';

interface SwaggerDefinitionsProps {
    definitions:any[];
    refName:string;
    parameters:any[];
}

interface SwaggerDefinitionsDispatchProps { }

type SwaggerParamProps = SwaggerDefinitionsProps & SwaggerDefinitionsDispatchProps;

interface SwaggerParamState { }

class SwaggerParamList extends React.Component<SwaggerParamProps, SwaggerParamState> {
    public render() {
        let{ parameters,definitions}=this.props
        let to=parameters.map((par)=>{
            //"#/definitions/VBdAccountScore" .substring(14)==VBdAccountScore
            if(par.in=='body'){
                if( par.schema==null) return <div>AAAAAA</div>
                let refName=par.schema.$ref.substring(14)
                let mod=definitions[refName]
                let prefix=""
                let subfix=""
                let retips=" // "
                let splitTag=" : "
                let splitCom=", "
                if(mod.type=='object'){
                    prefix=" {  "
                    if(mod.definitions) prefix+="//"+mod.description
                    subfix=" } "
                }else if(mod.type=='array'){
                    prefix=" [ "
                    if(mod.definitions) prefix+="//"+mod.description
                    subfix=" ] "
                }
                 return (<div>
                        <span className="link">{refName}</span>
                        {prefix}
                        <i className="h-icon-link link"/>
                        <div className="param-container">
                            {
                                Object.keys(mod.properties).map(key=><div className="param-name">
                                    <span>{key}</span>
                                    <span className="param-split">{splitTag}</span>
                                    <span className="param-type">{ mod.properties[key].type}</span>
                                    <span className="param-description">{mod.properties[key].description!=null?retips:""}</span>
                                    <span className="param-description">{ mod.properties[key].description}</span>
                                    </div>)
                            }
                        </div>
                        {subfix}
                        <div> </div>
                    </div>
                )

            }else if(par.in =='path'){

            }else if(par.in ==''){

            }
            return <div>----</div>
        })
        return (
            <div className="">{to}

            </div>
        );
    }
}

export default SwaggerParamList;
{/*<span className="link">VAccount</span>*/}
{/*<i className="h-icon-link link"></i></span>*/}
{/*<span className="param-view-prefix"></span>*/}
{/*<span className="param-description"></span>*/}