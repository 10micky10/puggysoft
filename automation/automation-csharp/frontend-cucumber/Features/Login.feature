Feature: Login

  Scenario: Usuario inicia sesi�n correctamente
    Given El usuario est� en la p�gina de login
    When Ingresa "usuario123" en el campo de usuario
    And Ingresa "contrase�a123" en el campo de contrase�a
    And Presiona el bot�n de login
    Then Deber�a ver el dashboard
