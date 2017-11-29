import React from 'react';
import {DtoStress} from '../../../../server/src/interfaces/dto_stress';
import {SelectParam} from 'antd/lib/menu';
import {DtoUser} from '../../../../server/src/interfaces/dto_user';
import {StringUtil} from '../../utils/string_util';
import {Tooltip, Button, Menu} from 'antd';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {NotificationMode} from '../../common/notification_mode';
import {noEnvironment, newStressName} from '../../common/constants';
import * as _ from 'lodash';
import {DtoRecord} from '../../../../server/src/interfaces/dto_record';
import {DtoEnvironment} from '../../../../server/src/interfaces/dto_environment';
import {DtoCollection} from '../../../../server/src/interfaces/dto_collection';
import {Dropdown, Icon, Select, Row, Col} from "antd"
import SwaggerParamList from "./swagger_param_list"
const Option = Select.Option;
import {Input} from 'antd';
import SwaggerSchemaView from "./swagger_schema_view";

const Search = Input.Search;


interface SwaggerListProps {
    swagger: any;
    activeTag: any;

    selectTag(tagName: string);
}

interface SwaggerListState {
    searchText:string;
    multiTags:string[];
    toggleState:any;
}

const createDefaultStress: (user: DtoUser) => DtoStress = (user: DtoUser) => {
    return {
        id: StringUtil.generateUID(),
        name: newStressName,
        ownerId: user.id,
        collectionId: '',
        environmentId: noEnvironment,
        concurrencyCount: 1,
        repeat: 1,
        qps: 0,
        timeout: 0,
        keepAlive: true,
        requests: [],
        notification: NotificationMode.none,
        emails: '',
        stressRecords: []
    };
};

class SwaggerPathList extends React.Component<SwaggerListProps, SwaggerListState> {

    constructor(props: SwaggerListProps) {
        super(props);
        this.state = {
            searchText:"",
            multiTags:[],
            toggleState:{}
        };
    }

    // public shouldComponentUpdate(nextProps: SwaggerListProps, nextState: SwaggerListState) {
    //     return !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state);
    //
    // }

    private onSelectChanged = (param: SelectParam) => {
        this.props.selectTag(param.item.props.data.id);
    }
    selectMultiTag = (tags) => {
        this.props.selectTag(tags.join(","));
    }
    /**
     * "value" maybe = event
     * @param value
     */
    onSearchPath=(value)=>{
        if(value.constructor==String)
            this.setState({searchText:value.trim()})
        else if(value.target){
            this.setState({searchText:value.target.value.trim()})
        }
    }
    calcFilterCount=()=>{
        let count=0
        const {activeTag, swagger} = this.props;
        let filteredPaths= Object.keys(swagger.paths)
            .map(path =>
                Object.keys(swagger.paths[path]).filter((method) => {
                    if (activeTag == "")
                        return true;
                    if (swagger.paths[path][method].tags)
                        return this.tagsMatch(swagger.paths[path][method].tags,activeTag.split(","))
                    return false
                }).filter((method)=>{
                    if(this.state.searchText=="" ||this.state.searchText==null) return true;
                    if(path.indexOf(this.state.searchText)>-1) return true;
                    if(swagger.paths[path][method].summary && swagger.paths[path][method].summary.indexOf(this.state.searchText)>-1) return true
                    if(swagger.paths[path][method].description && swagger.paths[path][method].description.indexOf(this.state.searchText)>-1) return true
                    return false;
                }).map(()=>count++))
        return count
    }

    toggleDetail=(methodPath)=>{
        let {toggleState}= this.state
        if(toggleState[methodPath]==false || toggleState[methodPath]==null)
            toggleState[methodPath]=true
        else{
            toggleState[methodPath]=false
        }
        this.setState({toggleState})
    }
    /**
     *  ['a','b','c'] is contain anyone of [ 'a' 'b' ,'d']
     */
    tagsMatch=(tags,selectTags)=>{
        for(let tag of tags){
            for(let selectTag of selectTags){
                if(tag==selectTag) return true
            }
        }
        return false
    }


    public render() {
        const {activeTag, swagger} = this.props;


        let totalCount=0;
        Object.keys(swagger.paths).map(path=>{
            Object.keys(swagger.paths[path]).map(method=>{
                totalCount++
            })
        })

        return (
            <div className="collection-panel app-project ">
                <div className="collection-tree-container" style={{paddingLeft: 20, paddingTop: 10, paddingRight: 20}}>
                    <div>
                        <Row gutter={24}>
                            <Col span={6}><span className="project-author">A</span>
                                <span className="project-title">接口列表({this.calcFilterCount()})</span></Col>
                            <Col span={6} offset={6}>
                                <Select
                                    mode="multiple"
                                    style={{width: '100%'}}
                                    placeholder="Select Tag"
                                    onChange={this.selectMultiTag}
                                >
                                    {swagger.tags.map((tag, i) => <Option key={tag.name} >{tag.name}</Option>)}
                                </Select>
                            </Col>
                            <Col span={6}>
                                <Search
                                    placeholder="search"
                                    style={{width: "100%"}}
                                    onChange={this.onSearchPath}
                                />
                            </Col>
                        </Row>
                    </div>
                    {
                        Object.keys(swagger.paths)
                            .map(path =>
                                Object.keys(swagger.paths[path]).filter((method) => {
                                    if (activeTag == "")
                                        return true;
                                    if (swagger.paths[path][method].tags)
                                        return this.tagsMatch(swagger.paths[path][method].tags,activeTag.split(","))
                                    return false
                                }).filter((method)=>{
                                    if(this.state.searchText=="" ||this.state.searchText==null) return true;
                                    if(path.indexOf(this.state.searchText)>-1) return true;
                                    if(swagger.paths[path][method].summary && swagger.paths[path][method].summary.indexOf(this.state.searchText)>-1) return true
                                    if(swagger.paths[path][method].description && swagger.paths[path][method].description.indexOf(this.state.searchText)>-1) return true

                                    return false;
                                }).map(method =>
                                    (<li className="path-li path-li-post" key={method + path} >
                                            <div className="path-head" onClick={(e)=>this.toggleDetail(method+path)}>
                                                <span className="path-method">{method}</span>
                                                <span className="path-name">{path}</span>
                                                <span className="path-description text-ellipsis">{swagger.paths[path][method].summary}</span>
                                                <span className="middle-right">
                                                    {swagger.paths[path][method].tags == null ? null : swagger.paths[path][method].tags.map((tag) => <span key={method + path + tag} className="h-tag">{tag}</span>)}
                                                </span>
                                            </div>
                                            {
                                                this.state.toggleState[method+path]?(<div className="path-info path-info-show" >
                                                    <div>
                                                        <pre></pre>
                                                        <h3>Headers</h3><p><span>{swagger.paths[path][method].consumes&& swagger.paths[path][method].consumes.join(";")}</span></p>
                                                        <h3>Request Body</h3>
                                                        <div className="path-info-body">
                                                            {
                                                                swagger.paths[path][method].parameters.map((parameter)=>{
                                                                    if(parameter.in=="body") return  <SwaggerSchemaView definitions={swagger.definitions} schema={parameter.schema} />
                                                                    if(parameter.in=='path') return  <div/>
                                                                    return <div></div>

                                                                })
                                                            }
                                                        </div>
                                                        <h3>Response Headers</h3> <p><span>content-type:application/json;wrapper=higgs</span></p>
                                                        <h4>Response Body</h4>
                                                        <div className="path-info-body">
                                                            <SwaggerSchemaView definitions={swagger.definitions} schema={swagger.paths[path][method].responses['200'].schema} />
                                                        </div>
                                                    </div>

                                                </div>):null
                                            }

                                        </li>
                                    )
                                )
                            )
                    }

                </div>
            </div>
        );
    }
}

export default SwaggerPathList;