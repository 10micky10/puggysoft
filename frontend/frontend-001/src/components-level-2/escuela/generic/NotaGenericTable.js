import React from "react";
import PropTypes from "prop-types";
import TableFilterGeneric from "../../generic/TableFilterGeneric";
import useInput from "../../../hooks/useInput";
import enumCompareOperators from "../../../models/enumCompareOperators";
import enumTableColumnsToShow from "../../../models/enumTableColumnsToShow";
import enumTableColumnCalification from "../../../models/escuela/enumTableColumnCalification";
import tableModel from "../../../models/escuela/notaTableModels";

function NotaGenericTable (props) {
  const {
    numberPagesToShow,
    tableTitle,
    tableSubTitle,
    handleGetData,
    handleGetSize,
    tableArrayCustomRowButtons,
    columnsToShow,
    columnCalification,
    fixArrayData
  } = props;

  // CRITERIA OF SEARCH OR FILTER
  const { value: criteriaId, onChange: criteriaOnChangeId, setValue: criteriaSetId } = useInput("");
  const { value: criteriaName, onChange: criteriaOnChangeName, setValue: criteriaSetName } = useInput("");
  const { value: criteriaShortName, onChange: criteriaOnChangeShortName, setValue: criteriaSetShortName } = useInput("");
  const { value: criteriaPorcentaje, onChange: criteriaOnChangePorcentaje, setValue: criteriaSetPorcentaje } = useInput("");
  const { value: criteriaCreatedBy, onChange: criteriaOnChangeCreatedBy, setValue: criteriaSetCreatedBy } = useInput("");
  const { value: criteriaUpdatedBy, onChange: criteriaOnChangeUpdatedBy, setValue: criteriaSetUpdatedBy } = useInput("");
  const { value: criteriaCreatedDate, onChange: criteriaOnChangeCreatedDate, setValue: criteriaSetCreatedDate } = useInput("");
  const { value: criteriaUpdatedDate, onChange: criteriaOnChangeUpdatedDate, setValue: criteriaSetUpdatedDate } = useInput("");

  // FILTER OPERATORS
  const { value: operatorId, onChange: operatorOnChangeId, setValue: operatorSetId } = useInput(enumCompareOperators.NUMBER_EQUALS);
  const { value: operatorName, onChange: operatorOnChangeName, setValue: operatorSetName } = useInput(enumCompareOperators.TEXT_CONTAINS);
  const { value: operatorShortName, onChange: operatorOnChangeShortName, setValue: operatorSetShortName } = useInput(enumCompareOperators.TEXT_CONTAINS);
  const { value: operatorPorcentaje, onChange: operatorOnChangePorcentaje, setValue: operatorSetPorcentaje } = useInput(enumCompareOperators.TEXT_CONTAINS);
  const { value: operatorCreatedBy, onChange: operatorOnChangeCreatedBy, setValue: operatorSetCreatedBy } = useInput(enumCompareOperators.TEXT_CONTAINS);
  const { value: operatorUpdatedBy, onChange: operatorOnChangeUpdatedBy, setValue: operatorSetUpdatedBy } = useInput(enumCompareOperators.TEXT_CONTAINS);
  const { value: operatorCreatedDate, onChange: operatorOnChangeCreatedDate, setValue: operatorSetCreatedDate } = useInput(enumCompareOperators.DATE_EQUALS);
  const { value: operatorUpdatedDate, onChange: operatorOnChangeUpdatedDate, setValue: operatorSetUpdatedDate } = useInput(enumCompareOperators.DATE_EQUALS);

  const { arrayColumnsFilter, clearFilters, getFilterBody, arrayColumnsLabels, arrayDataFields } = tableModel(
    columnsToShow,
    columnCalification,
    /* ID */ criteriaId, criteriaOnChangeId, criteriaSetId, operatorId, operatorOnChangeId, operatorSetId,
    /* NAME */criteriaName, criteriaOnChangeName, criteriaSetName, operatorName, operatorOnChangeName, operatorSetName,
    /* SHORT NAME */criteriaShortName, criteriaOnChangeShortName, criteriaSetShortName, operatorShortName, operatorOnChangeShortName, operatorSetShortName,
    /* PORCENTAJE */criteriaPorcentaje, criteriaOnChangePorcentaje, criteriaSetPorcentaje, operatorPorcentaje, operatorOnChangePorcentaje, operatorSetPorcentaje,
    /* CREATED BY */criteriaCreatedBy, criteriaOnChangeCreatedBy, criteriaSetCreatedBy, operatorCreatedBy, operatorOnChangeCreatedBy, operatorSetCreatedBy,
    /* UPDATED BY */criteriaUpdatedBy, criteriaOnChangeUpdatedBy, criteriaSetUpdatedBy, operatorUpdatedBy, operatorOnChangeUpdatedBy, operatorSetUpdatedBy,
    /* CREATED DATE */criteriaCreatedDate, criteriaOnChangeCreatedDate, criteriaSetCreatedDate, operatorCreatedDate, operatorOnChangeCreatedDate, operatorSetCreatedDate,
    /* UPDATED DATE */criteriaUpdatedDate, criteriaOnChangeUpdatedDate, criteriaSetUpdatedDate, operatorUpdatedDate, operatorOnChangeUpdatedDate, operatorSetUpdatedDate
  );

  return (
    <TableFilterGeneric
      arrayColumns={arrayColumnsLabels}
      arrayDataFields={arrayDataFields}
      handleGetData={handleGetData}
      handleGetSize={handleGetSize}
      tableTitle={tableTitle}
      tableSubTitle={tableSubTitle}
      tableArrayCustomRowButtons={tableArrayCustomRowButtons}
      numberPagesToShow={numberPagesToShow}
      arrayColumnsFilter={arrayColumnsFilter}
      clearFilters={clearFilters}
      getFilterBody={getFilterBody}
      fixArrayData={fixArrayData}
    >
    </TableFilterGeneric>
  );
}

export default NotaGenericTable;

NotaGenericTable.propTypes = {
  numberPagesToShow: PropTypes.number,
  tableTitle: PropTypes.string,
  tableSubTitle: PropTypes.string,
  handleGetData: PropTypes.func,
  handleGetSize: PropTypes.func,
  tableArrayCustomRowButtons: PropTypes.array,
  columnsToShow: PropTypes.oneOf([
    enumTableColumnsToShow.FULL,
    enumTableColumnsToShow.MEDIUM,
  ]),
  columnCalification: PropTypes.oneOf([
    enumTableColumnCalification.MANAGE,
    enumTableColumnCalification.VIEW,
  ]),
  fixArrayData: PropTypes.func
};

NotaGenericTable.defaultProps = {
  numberPagesToShow: 0,
  tableTitle: "",
  tableSubTitle: undefined,
  handleGetData: () => { },
  handleGetSize: () => { },
  tableArrayCustomRowButtons: [],
  columnsToShow: enumTableColumnsToShow.FULL,
  columnCalification: undefined,
  fixArrayData: undefined
};
