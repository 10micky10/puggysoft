import enumCompareOperators from "../enumCompareOperators";
import enumTableColumnsToShow from "../enumTableColumnsToShow";
import arrayFields from "./cursoTableFields";
import arrayLabels from "./cursoTableLabels";
import arrayMensualidadLabels from "../pagos-upea/programaPostgradoCursoTableLabels";
import tableFilter from "./cursoTableFilter";
import enumSystems from "../enumSystems";

const tableModel = function (
  tableColumnsToShow,
  /* ID */ criteriaId, criteriaOnChangeId, criteriaSetId, operatorId, operatorOnChangeId, operatorSetId,
  /* NAME */criteriaName, criteriaOnChangeName, criteriaSetName, operatorName, operatorOnChangeName, operatorSetName,
  /* SHORT NAME */criteriaShortName, criteriaOnChangeShortName, criteriaSetShortName, operatorShortName, operatorOnChangeShortName, operatorSetShortName,
  /* GESTION */criteriaGestion, criteriaOnChangeGestion, criteriaSetGestion, operatorGestion, operatorOnChangeGestion, operatorSetGestion,
  /* CREATED BY */criteriaCreatedBy, criteriaOnChangeCreatedBy, criteriaSetCreatedBy, operatorCreatedBy, operatorOnChangeCreatedBy, operatorSetCreatedBy,
  /* UPDATED BY */criteriaUpdatedBy, criteriaOnChangeUpdatedBy, criteriaSetUpdatedBy, operatorUpdatedBy, operatorOnChangeUpdatedBy, operatorSetUpdatedBy,
  /* CREATED DATE */criteriaCreatedDate, criteriaOnChangeCreatedDate, criteriaSetCreatedDate, operatorCreatedDate, operatorOnChangeCreatedDate, operatorSetCreatedDate,
  /* UPDATED DATE */criteriaUpdatedDate, criteriaOnChangeUpdatedDate, criteriaSetUpdatedDate, operatorUpdatedDate, operatorOnChangeUpdatedDate, operatorSetUpdatedDate,
  whatSystemIs
) {
  let arrayDataFields;
  let arrayColumnsLabels;
  switch (whatSystemIs) {
  case enumSystems.MENSUALIDAD:
    arrayDataFields = arrayFields;
    arrayColumnsLabels = arrayMensualidadLabels;
    break;
  default:
    arrayDataFields = arrayFields;
    arrayColumnsLabels = arrayLabels;
  }

  let arrayColumnsFilter = tableFilter(
    /* ID */ criteriaId, criteriaOnChangeId, operatorId, operatorOnChangeId,
    /* NAME */criteriaName, criteriaOnChangeName, operatorName, operatorOnChangeName,
    /* SHORT NAME */criteriaShortName, criteriaOnChangeShortName, operatorShortName, operatorOnChangeShortName,
    /* GESTION */criteriaGestion, criteriaOnChangeGestion, operatorGestion, operatorOnChangeGestion,
    /* CREATED BY */criteriaCreatedBy, criteriaOnChangeCreatedBy, operatorCreatedBy, operatorOnChangeCreatedBy,
    /* UPDATED BY */criteriaUpdatedBy, criteriaOnChangeUpdatedBy, operatorUpdatedBy, operatorOnChangeUpdatedBy,
    /* CREATED DATE */criteriaCreatedDate, criteriaOnChangeCreatedDate, operatorCreatedDate, operatorOnChangeCreatedDate,
    /* UPDATED DATE */criteriaUpdatedDate, criteriaOnChangeUpdatedDate, operatorUpdatedDate, operatorOnChangeUpdatedDate);

  const clearFilters = function () {
    criteriaSetId("");
    criteriaSetName("");
    criteriaSetShortName("");
    criteriaSetGestion("");
    criteriaSetCreatedBy("");
    criteriaSetUpdatedBy("");
    criteriaSetCreatedDate("");
    criteriaSetUpdatedDate("");
    setOperatorsDefaultValues();
  };

  const setOperatorsDefaultValues = function () {
    operatorSetId(enumCompareOperators.NUMBER_EQUALS);
    operatorSetName(enumCompareOperators.TEXT_CONTAINS);
    operatorSetShortName(enumCompareOperators.TEXT_CONTAINS);
    operatorSetGestion(enumCompareOperators.TEXT_CONTAINS);
    operatorSetCreatedBy(enumCompareOperators.TEXT_CONTAINS);
    operatorSetUpdatedBy(enumCompareOperators.TEXT_CONTAINS);
    operatorSetCreatedDate(enumCompareOperators.DATE_EQUALS);
    operatorSetUpdatedDate(enumCompareOperators.DATE_EQUALS);
  };

  const isMedium = tableColumnsToShow === enumTableColumnsToShow.MEDIUM;
  if (isMedium) {
    arrayColumnsFilter = arrayColumnsFilter.slice(0, arrayColumnsFilter.length - 4);
    arrayColumnsLabels = arrayColumnsLabels.slice(0, arrayColumnsLabels.length - 4);
    arrayDataFields = arrayDataFields.slice(0, arrayDataFields.length - 4);
  }

  const getFilterBody = () => {
    const tenant = window.sessionStorage.getItem("tenant");
    const filterBody = {
      idCriteria: criteriaId,
      idOperator: operatorId,
      nameCriteria: criteriaName,
      nameOperator: operatorName,
      shortNameCriteria: criteriaShortName,
      shortNameOperator: operatorShortName,
      gestionCriteria: criteriaGestion,
      gestionOperator: operatorGestion,
      createdByCriteria: criteriaCreatedBy,
      createdByOperator: operatorCreatedBy,
      updatedByCriteria: criteriaUpdatedBy,
      updatedByOperator: operatorUpdatedBy,
      creationDateCriteria: criteriaCreatedDate,
      creationDateOperator: operatorCreatedDate,
      updateDateCriteria: criteriaUpdatedDate,
      updateDateOperator: operatorUpdatedDate,
      tenantCriteria: tenant,
      tenantOperator: enumCompareOperators.TEXT_EQUALS
    };
    return filterBody;
  };

  return {
    arrayColumnsFilter,
    clearFilters,
    getFilterBody,
    setOperatorsDefaultValues,
    arrayDataFields,
    arrayColumnsLabels
  };
};

export default tableModel;
