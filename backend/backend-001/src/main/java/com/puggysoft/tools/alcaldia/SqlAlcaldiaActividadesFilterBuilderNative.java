package com.puggysoft.tools.alcaldia;

import com.puggysoft.dtos.alcaldia.DtoAlcaldiaActividadesFilter;
import com.puggysoft.tools.SqlFilterBuilder;

/** Tool class. */
public final class SqlAlcaldiaActividadesFilterBuilderNative {

  /** Constructor. */
  private SqlAlcaldiaActividadesFilterBuilderNative() {
  }

  /** build filter query method. */
  public static String build(DtoAlcaldiaActividadesFilter dtoAlcaldiaActividadesFilter) {
    String query = "";
    query = query + SqlFilterBuilder.getFilterQuery("alcaldia_actividades.id",
        dtoAlcaldiaActividadesFilter.idCriteria,
        dtoAlcaldiaActividadesFilter.idOperator);
    query = query + SqlFilterBuilder.getFilterQuery("alcaldia_actividades.name",
        dtoAlcaldiaActividadesFilter.nameCriteria,
        dtoAlcaldiaActividadesFilter.nameOperator);
    query = query + SqlFilterBuilder.getFilterQuery("alcaldia_actividades.id_timbre",
        dtoAlcaldiaActividadesFilter.idTimbreCriteria,
        dtoAlcaldiaActividadesFilter.idTimbreOperator);
    query = query + SqlFilterBuilder.getFilterQuery("alcaldia_actividades.cantidad_timbres",
        dtoAlcaldiaActividadesFilter.cantidadTimbresCriteria,
        dtoAlcaldiaActividadesFilter.cantidadTimbresOperator);
    query = query + SqlFilterBuilder.getFilterQuery("alcaldia_actividades.id_folder",
        dtoAlcaldiaActividadesFilter.idFolderCriteria,
        dtoAlcaldiaActividadesFilter.idFolderOperator);
    query = query + SqlFilterBuilder.getFilterQuery("alcaldia_actividades.cantidad_folders",
        dtoAlcaldiaActividadesFilter.cantidadFoldersCriteria,
        dtoAlcaldiaActividadesFilter.cantidadFoldersOperator);
    query = query + SqlFilterBuilder.getFilterQuery("alcaldia_actividades.aux",
        dtoAlcaldiaActividadesFilter.auxCriteria,
        dtoAlcaldiaActividadesFilter.auxOperator);
    query = query + SqlFilterBuilder.getFilterQuery("alcaldia_actividades.tenant ",
        dtoAlcaldiaActividadesFilter.tenantCriteria,
        dtoAlcaldiaActividadesFilter.tenantOperator);
    query = query
        + SqlFilterBuilder.getFilterQuery("alcaldia_actividades.created_by",
            dtoAlcaldiaActividadesFilter.createdByCriteria,
            dtoAlcaldiaActividadesFilter.createdByOperator);
    query = query
        + SqlFilterBuilder.getFilterQuery("alcaldia_actividades.updated_by",
            dtoAlcaldiaActividadesFilter.updatedByCriteria,
            dtoAlcaldiaActividadesFilter.updatedByOperator);
    query = query
        + SqlFilterBuilder.getFilterQuery("alcaldia_actividades.creation_date",
            dtoAlcaldiaActividadesFilter.creationDateCriteria,
            dtoAlcaldiaActividadesFilter.creationDateOperator);
    query = query
        + SqlFilterBuilder.getFilterQuery("alcaldia_actividades.update_date",
            dtoAlcaldiaActividadesFilter.updateDateCriteria,
            dtoAlcaldiaActividadesFilter.updateDateOperator);
    return query;
  }

}
