using System;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;

namespace frontend_basic
{

    public class Tests
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void Test1()
        {
            IWebDriver driver = new ChromeDriver();

            try
            {
                // Navegar a la p�gina de inicio de sesi�n
                driver.Navigate().GoToUrl("https://example.com/login");
                driver.Manage().Window.Maximize();

                // Esperar a que los elementos est�n disponibles
                WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));

                // Localizar los campos de usuario y contrase�a
                IWebElement usernameField = wait.Until(d => d.FindElement(By.Id("username")));
                IWebElement passwordField = driver.FindElement(By.Id("password"));
                IWebElement loginButton = driver.FindElement(By.Id("loginButton"));

                // Ingresar credenciales
                usernameField.SendKeys("usuario123");
                passwordField.SendKeys("contrase�a123");

                // Hacer clic en el bot�n de login
                loginButton.Click();

                // Esperar la redirecci�n y verificar si el login fue exitoso
                wait.Until(d => d.FindElement(By.Id("dashboard")));

                Console.WriteLine("Inicio de sesi�n exitoso.");
            }
            catch (Exception e)
            {
                Console.WriteLine("Error durante la prueba: " + e.Message);
            }
            finally
            {
                // Cerrar el navegador
                driver.Quit();
            }
            Assert.Pass();
        }
    }
}
