import React from "react";
import PropTypes from "prop-types";
import TableFilterGeneric from "../../generic/TableFilterGeneric";
import useInput from "../../../hooks/useInput";
import enumCompareOperators from "../../../models/enumCompareOperators";
import enumTableColumnsToShow from "../../../models/alcaldia/enumTableColumnsToShow";
import alcaldiaRecursosMunicipalesFoldersTableModels from "../../../models/alcaldia/alcaldiaRecursosMunicipalesFoldersTableModels";

function AlcaldiaRecursosMunicipalesFoldersGenericTable (props) {
  const {
    numberPagesToShow,
    tableTitle,
    tableSubTitle,
    handleGetData,
    handleGetSize,
    tableArrayCustomRowButtons,
    columnsToShow,
    fixArrayData
  } = props;

  // CRITERIA OF SEARCH OR FILTER
  const { value: criteriaId, onChange: criteriaOnChangeId, setValue: criteriaSetId } = useInput("");
  const { value: criteriaName, onChange: criteriaOnChangeName, setValue: criteriaSetName } = useInput("");
  const { value: criteriaTalonarioInicio, onChange: criteriaOnChangeTalonarioInicio, setValue: criteriaSetTalonarioInicio } = useInput("");
  const { value: criteriaTalonarioFinal, onChange: criteriaOnChangeTalonarioFinal, setValue: criteriaSetTalonarioFinal } = useInput("");
  const { value: criteriaPrecio, onChange: criteriaOnChangePrecio, setValue: criteriaSetPrecio } = useInput("");
  const { value: criteriaCreatedBy, onChange: criteriaOnChangeCreatedBy, setValue: criteriaSetCreatedBy } = useInput("");
  const { value: criteriaUpdatedBy, onChange: criteriaOnChangeUpdatedBy, setValue: criteriaSetUpdatedBy } = useInput("");
  const { value: criteriaCreatedDate, onChange: criteriaOnChangeCreatedDate, setValue: criteriaSetCreatedDate } = useInput("");
  const { value: criteriaUpdatedDate, onChange: criteriaOnChangeUpdatedDate, setValue: criteriaSetUpdatedDate } = useInput("");

  // FILTER OPERATORS
  const { value: operatorId, onChange: operatorOnChangeId, setValue: operatorSetId } = useInput(enumCompareOperators.TEXT_CONTAINS);
  const { value: operatorName, onChange: operatorOnChangeName, setValue: operatorSetName } = useInput(enumCompareOperators.TEXT_CONTAINS);
  const { value: operatorTalonarioInicio, onChange: operatorOnChangeTalonarioInicio, setValue: operatorSetTalonarioInicio } = useInput(enumCompareOperators.NUMBER_EQUALS);
  const { value: operatorTalonarioFinal, onChange: operatorOnChangeTalonarioFinal, setValue: operatorSetTalonarioFinal } = useInput(enumCompareOperators.NUMBER_EQUALS);
  const { value: operatorPrecio, onChange: operatorOnChangePrecio, setValue: operatorSetPrecio } = useInput(enumCompareOperators.TEXT_CONTAINS);
  const { value: operatorCreatedBy, onChange: operatorOnChangeCreatedBy, setValue: operatorSetCreatedBy } = useInput(enumCompareOperators.TEXT_CONTAINS);
  const { value: operatorUpdatedBy, onChange: operatorOnChangeUpdatedBy, setValue: operatorSetUpdatedBy } = useInput(enumCompareOperators.TEXT_CONTAINS);
  const { value: operatorCreatedDate, onChange: operatorOnChangeCreatedDate, setValue: operatorSetCreatedDate } = useInput(enumCompareOperators.DATE_EQUALS);
  const { value: operatorUpdatedDate, onChange: operatorOnChangeUpdatedDate, setValue: operatorSetUpdatedDate } = useInput(enumCompareOperators.DATE_EQUALS);

  const { arrayColumnsFilter, clearFilters, getFilterBody, arrayColumnsLabels, arrayDataFields } = alcaldiaRecursosMunicipalesFoldersTableModels(
    columnsToShow,
    /* ID */ criteriaId, criteriaOnChangeId, criteriaSetId, operatorId, operatorOnChangeId, operatorSetId,
    /* NAME */criteriaName, criteriaOnChangeName, criteriaSetName, operatorName, operatorOnChangeName, operatorSetName,
    /* TALONARIO INICIO */ criteriaTalonarioInicio, criteriaOnChangeTalonarioInicio, criteriaSetTalonarioInicio, operatorTalonarioInicio, operatorOnChangeTalonarioInicio, operatorSetTalonarioInicio,
    /* TALONARIO FINAL */ criteriaTalonarioFinal, criteriaOnChangeTalonarioFinal, criteriaSetTalonarioFinal, operatorTalonarioFinal, operatorOnChangeTalonarioFinal, operatorSetTalonarioFinal,
    /* PRECIO */ criteriaPrecio, criteriaOnChangePrecio, criteriaSetPrecio, operatorPrecio, operatorOnChangePrecio, operatorSetPrecio,
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

export default AlcaldiaRecursosMunicipalesFoldersGenericTable;

AlcaldiaRecursosMunicipalesFoldersGenericTable.propTypes = {
  numberPagesToShow: PropTypes.number,
  tableTitle: PropTypes.string,
  tableSubTitle: PropTypes.string,
  handleGetData: PropTypes.func,
  handleGetSize: PropTypes.func,
  tableArrayCustomRowButtons: PropTypes.array,
  columnsToShow: PropTypes.oneOf([
    enumTableColumnsToShow.FULL,
    enumTableColumnsToShow.MEDIUM,
    enumTableColumnsToShow.MINIMUM,
    enumTableColumnsToShow.SALEADD,
    enumTableColumnsToShow.SALEDELETE
  ]),
  fixArrayData: PropTypes.func
};

AlcaldiaRecursosMunicipalesFoldersGenericTable.defaultProps = {
  numberPagesToShow: 0,
  tableTitle: "",
  tableSubTitle: undefined,
  handleGetData: () => { },
  handleGetSize: () => { },
  tableArrayCustomRowButtons: [],
  columnsToShow: enumTableColumnsToShow.FULL,
  fixArrayData: undefined
};
