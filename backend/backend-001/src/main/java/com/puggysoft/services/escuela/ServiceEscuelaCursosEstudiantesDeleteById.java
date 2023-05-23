package com.puggysoft.services.escuela;

import com.puggysoft.repositories.escuela.IRepositoryEscuelaCursosEstudiantes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

/** Services for delete by id. */
@Service
public class ServiceEscuelaCursosEstudiantesDeleteById {

  @Autowired
  private IRepositoryEscuelaCursosEstudiantes repositoryEscuelaCursosEstudiantes;

  /** method for delete. */
  public ResponseEntity<String> deleteById(Long id) {
    try {
      if (repositoryEscuelaCursosEstudiantes.existsById(id)) {
        repositoryEscuelaCursosEstudiantes.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body("Deleted successfully");
      }
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not found");
    } catch (DataAccessException ex) {
      String dbException = ex.getMostSpecificCause().getMessage();
      return ResponseEntity.status(HttpStatus.CONFLICT).body(dbException);
    }
  }
}
