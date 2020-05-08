import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { GridRow, GridRowProps } from './GridRow.component';
import { getCustomProps, getDataType, getSortedGroupedDataTypes } from '../../utils/dataTypeUtils';
import { Store } from '../../../types/general';
import { DataRow } from '../generator/generator.reducer';
import * as actions from '../generator/generator.actions';
import { DataTypeFolder } from '../../_plugins';
import * as selectors from '../generator/generator.selectors';

type OwnProps = {
	row: DataRow;
	index: number;
	dimensions: {
		width: number;
		height: number;
	};
};

const mapStateToProps = (state: Store, ownProps: OwnProps): Partial<GridRowProps> => {
	const { dataType } = ownProps.row;

	const { Example, Options, customProps } = getDataType(dataType);
	const dataTypeI18n = selectors.getDataTypeI18n(state);
	const dtCustomProps = getCustomProps(customProps, state);

	console.log('holy shit, custom props!!!', customProps);

	return {
		dtDropdownOptions: getSortedGroupedDataTypes(),
		i18n: selectors.getCoreI18n(state),
		countryI18n: selectors.getCountryI18n(state),
		selectedDataTypeI18n: dataType ? dataTypeI18n[dataType] : null,
		Example,
		Options,
		dtCustomProps,
		...ownProps
	};
};

const mapDispatchToProps = (dispatch: Dispatch): Partial<GridRowProps> => ({
	onRemove: (id: string): any => dispatch(actions.removeRow(id)),
	onChangeTitle: (id: string, value: string): any => dispatch(actions.onChangeTitle(id, value)),
	onConfigureDataType: (id: string, data: any): any => dispatch(actions.onConfigureDataType(id, data)),
	onSelectDataType: (dataType: DataTypeFolder, id: string): any => dispatch(actions.onSelectDataType(dataType, id)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GridRow);