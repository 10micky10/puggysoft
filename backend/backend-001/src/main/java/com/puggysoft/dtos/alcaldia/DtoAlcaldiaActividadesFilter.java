package com.puggysoft.dtos.alcaldia;

import com.puggysoft.models.EnumCompareOperator;
import javax.validation.constraints.Size;
import lombok.Data;

/**
 * Class.
 */
@Data
public class DtoAlcaldiaActividadesFilter {

  // ID
  public String idCriteria;
  public EnumCompareOperator idOperator;
  // NAME
  public String nameCriteria;
  public EnumCompareOperator nameOperator;
  // ID TIMBRE
  public String idTimbreCriteria;
  public EnumCompareOperator idTimbreOperator;
  // CANTIDAD TIMBRES
  public String cantidadTimbresCriteria;
  public EnumCompareOperator cantidadTimbresOperator;
  // ID FOLDER
  public String idFolderCriteria;
  public EnumCompareOperator idFolderOperator;
  // CANTIDAD FOLDERS
  public String cantidadFoldersCriteria;
  public EnumCompareOperator cantidadFoldersOperator;
  // AUX
  public String auxCriteria;
  public EnumCompareOperator auxOperator;
  // TENANT
  public String tenantCriteria;
  public EnumCompareOperator tenantOperator;
  // CREATED BY
  @Size(max = 30)
  public String createdByCriteria;
  public EnumCompareOperator createdByOperator;
  // UPDATED BY
  @Size(max = 30)
  public String updatedByCriteria;
  public EnumCompareOperator updatedByOperator;
  // CREATION DATE
  public String creationDateCriteria;
  public EnumCompareOperator creationDateOperator;
  // UPDATED DATE
  public String updateDateCriteria;
  public EnumCompareOperator updateDateOperator;
}