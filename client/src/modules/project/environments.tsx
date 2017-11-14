import React from 'react';
import { Table, Modal, Input, Button } from 'antd';
import { DtoEnvironment } from '../../../../server/src/interfaces/dto_environment';
import KeyValueComponent from '../../components/key_value';
import { KeyValueEditType, KeyValueEditMode } from '../../common/custom_type';
import { DtoHeader } from '../../../../server/src/interfaces/dto_header';
import { StringUtil } from '../../utils/string_util';
import { DtoVariable } from '../../../../server/src/interfaces/dto_variable';
import { confirmDlg } from '../../components/confirm_dialog/index';

const getDefaultEnv = (projectId: string) => { return { id: StringUtil.generateUID(), name: '', variables: [], project: { id: projectId } }; };

interface EnvironmentsProps {

    activeProject: string;

    environments: DtoEnvironment[];

    isEditEnvDlgOpen: boolean;

    editedEnvironment?: string;

    createEnv(env: DtoEnvironment);

    updateEnv(env: DtoEnvironment);

    delEnv(envId: string);

    editEnvCompleted();

    editEnv(projectId: string, envId: string);
}

interface EnvironmentsState {

    variablesEditMode: KeyValueEditMode;

    environment: DtoEnvironment;

    isNew: boolean;
}

class EnvironmentTable extends Table<DtoEnvironment> { }

class EnvironmentColumn extends Table.Column<DtoEnvironment> { }

class Environments extends React.Component<EnvironmentsProps, EnvironmentsState> {

    private envNameInput: Input;

    constructor(props: EnvironmentsProps) {
        super(props);
        this.state = {
            isNew: false,
            variablesEditMode: KeyValueEditType.keyValueEdit,
            environment: getDefaultEnv(props.activeProject)
        };
    }

    componentWillReceiveProps(nextProps: EnvironmentsProps) {
        this.showEditDlg(nextProps);
    }

    public componentDidMount() {
        this.showEditDlg(this.props);
    }

    private showEditDlg = (props: EnvironmentsProps) => {
        const { editedEnvironment, environments, activeProject, isEditEnvDlgOpen } = props;
        if (isEditEnvDlgOpen) {
            this.setState({
                ...this.state, environment: environments.find(e => e.id === editedEnvironment) || getDefaultEnv(activeProject)
            }, () => this.envNameInput && this.envNameInput.focus());
        }
    }

    private saveEnvironment = () => {
        if (!this.state.environment.name) {
            return;
        }

        this.state.isNew ? this.props.createEnv(this.state.environment) : this.props.updateEnv(this.state.environment);
        this.props.editEnvCompleted();
    }

    private duplicate = (env: DtoEnvironment) => {
        const envCopy = { ...env };
        envCopy.name = `${envCopy.name}.copy`;
        envCopy.id = StringUtil.generateUID();
        envCopy.variables.forEach(v => v.id = StringUtil.generateUID());
        this.props.createEnv(envCopy);
    }

    private delEnvironment = (record: DtoEnvironment) => {
        confirmDlg('environment', () => this.props.delEnv(record.id), 'delete', record.name);
    }

    private onHeadersChanged = (variables: DtoHeader[]) => {
        this.setState({ ...this.state, environment: { ...this.state.environment, variables: variables as DtoVariable[] } });
    }

    private onEnvNameChanged = (envName: string) => {
        this.setState({ ...this.state, environment: { ...this.state.environment, name: envName } });
    }

    private editEnv = (env: DtoEnvironment, isNew: boolean) => {
        this.setState({
            ...this.state, isNew: isNew
        }, () => this.props.editEnv(this.props.activeProject, env.id));
    }

    private onHeaderModeChanged = () => {
        this.setState({
            ...this.state,
            variablesEditMode: KeyValueEditType.getReverseMode(this.state.variablesEditMode)
        });
    }

    public render() {
        return (
            <div>
                <div className="project-title">
                    Environments
                    <Button
                        className="project-create-btn"
                        type="primary"
                        size="small"
                        icon="plus"
                        ghost={true}
                        onClick={() => this.editEnv(getDefaultEnv(this.props.activeProject), true)}
                    >
                        New Environment
                    </Button>
                </div>
                <EnvironmentTable
                    className="project-table project-environments"
                    bordered={true}
                    size="middle"
                    rowKey="id"
                    dataSource={this.props.environments}
                    pagination={false}
                >
                    <EnvironmentColumn
                        title="Environment"
                        dataIndex="name"
                        key="name"
                        render={(text, record) => (
                            <a href="#" onClick={() => this.editEnv(record, false)}>{text}</a>
                        )}
                    />
                    <EnvironmentColumn
                        title="Action"
                        key="action"
                        width={240}
                        render={(text, record) => (
                            <span>
                                <a href="#" onClick={() => this.editEnv(record, false)}>Edit</a> - <span />
                                <a href="#" onClick={() => this.duplicate(record)}>Duplicate</a> - <span />
                                <a href="#" onClick={() => this.delEnvironment(record)}>Delete</a>
                            </span>
                        )}
                    />
                </EnvironmentTable>
                <Modal
                    title="Edit Environment"
                    visible={this.props.isEditEnvDlgOpen}
                    onCancel={() => this.props.editEnvCompleted()}
                    okText="Save"
                    cancelText="Cancel"
                    onOk={this.saveEnvironment}
                    width={600}
                >
                    <div className="env-variable-tip">
                        {'Variables can be used in Url, Headers with format {{key}}, when send request, {{key}} will be replaced with its corresponding value. For example, you can use different host for environment(QA, Staging, Product) by using variables.'}
                    </div>
                    <div style={{ marginBottom: '8px' }}>Environment Name:</div>
                    <Input
                        ref={ele => this.envNameInput = ele}
                        style={{ width: '100%' }}
                        value={this.state.environment.name}
                        spellCheck={false}
                        onChange={e => this.onEnvNameChanged(e.currentTarget.value)}
                    />
                    <div className="env-variable-title">
                        <span>Variables:</span>
                        <span className="env-variable-mode-btn">
                            <Button className="tab-extra-button" onClick={this.onHeaderModeChanged}>
                                {KeyValueEditType.getReverseMode(this.state.variablesEditMode)}
                            </Button>
                        </span>
                    </div>
                    <KeyValueComponent
                        mode={this.state.variablesEditMode}
                        headers={this.state.environment.variables}
                        onHeadersChanged={this.onHeadersChanged}
                    />
                </Modal>
            </div>
        );
    }
}

export default Environments;
