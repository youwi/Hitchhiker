import React from 'react';
import { DtoStress } from '../../../../server/src/interfaces/dto_stress';
import { SelectParam } from 'antd/lib/menu';
import { DtoUser } from '../../../../server/src/interfaces/dto_user';
import { StringUtil } from '../../utils/string_util';
import { Tooltip, Button, Menu } from 'antd';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { NotificationMode } from '../../common/notification_mode';
import { noEnvironment, newStressName } from '../../common/constants';
import * as _ from 'lodash';
import { DtoRecord } from '../../../../server/src/interfaces/dto_record';
import { DtoEnvironment } from '../../../../server/src/interfaces/dto_environment';
import { DtoCollection } from '../../../../server/src/interfaces/dto_collection';
import {Dropdown,Icon} from "antd"

interface SwaggerListProps {
    swagger:any;
    activeTag:any;
    selectTag(tagName:string);
}

interface SwaggerListState {

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

class SwaggerTagList extends React.Component<SwaggerListProps, SwaggerListState> {

    constructor(props: SwaggerListProps) {
        super(props);
        this.state = {
            isCreateNew: true,
            isEditDlgOpen: false,
            isEditDlgRendered: false
        };
    }

    public shouldComponentUpdate(nextProps: SwaggerListProps, nextState: SwaggerListState) {
        return !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state);
    }

    private onSelectChanged = (param: SelectParam) => {
        this.props.selectTag(param.item.props.data.name);
    }
    calcTagNameCount=(swagger)=>{
        let newTags={}
        Object.keys(swagger.paths).map(path=>{
            Object.keys(swagger.paths[path]).map(method=>{
                if(swagger.paths[path][method].tags!=null)
                    swagger.paths[path][method].tags.map(tag=>{
                        if( newTags[tag]==null)  newTags[tag]=0
                        newTags[tag]++
                    })
            })
        })
        return newTags
    }


    public render() {
        const { activeTag,swagger } = this.props;
        const tagNameCount=this.calcTagNameCount(swagger)
        return (
            <div className="collection-panel collection-tree">

            <div className="collection-tree-container">
            <div className="small-toolbar">
                <span>Project</span>
                <span>
                    {/*<Dropdown overlay={true} trigger={['click']} style={{ width: 200 }}>*/}
                        {/*<a className="ant-dropdown-link" href="#">*/}
                            {/*<Icon type="down" />*/}
                        {/*</a>*/}
                    {/*</Dropdown>*/}
                </span>
            </div>
                <PerfectScrollbar>
                    <Menu
                        className="path-tags-list"
                        mode="inline"
                        inlineIndent={0}
                        selectedKeys={[activeTag]}
                        onSelect={this.onSelectChanged}
                    >
                        {
                            swagger.tags.sort((a,b)=>a.name.localeCompare(b.name)).map(t =>
                                (
                                    <Menu.Item key={t.name} data={t}>
                                        {t.name}
                                        <span className="h-badge-count">{tagNameCount[t.name]}</span>
                                    </Menu.Item>
                                )
                            )
                        }
                    </Menu>
                </PerfectScrollbar>
            </div>
            </div>
        );
    }
}

export default SwaggerTagList;