import React, { useEffect, useState, useCallback, useRef } from "react";
import { useHistory } from "react-router";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CommonLoading from "../../components-level-1/CommonLoading";
import i18n from "../../i18n/i18n";
import useInput from "../../hooks/useInput";
import enumVentaStatus from "./../../models/alcaldia/enumVentaStatus";
import GeneratePdf from "../../tools/alcaldia/pdfBuilderComprobante";
import enumCompareOperators from "../../models/enumCompareOperators";
import {
  handleAddRequest,
  handleEditRequest,
  handleFilterRequest,
  handleGetRequest
} from "../../actions/HandleManager";
import {
  handleValidation,
  classNameFormTextNew
} from "../../validations/alcaldia/HandleAlcaldiaRecursosMunicipalesVentasFormValidations";
import CommonMessage from "../../components-level-1/CommonMessage";

import "./../css/all-forms.css";
import "./../css/all-two-divs-side-by-side.css";
import "./../css/all-five-divs-side-by-side.css";
import "./../css/all-six-divs-side-by-side.css";
import "./../css/button-inline.css";
import AlcaldiaRecursosMunicipalesTableAddSale from "./AlcaldiaRecursosMunicipalesTableAddSale";
import AlcaldiaRecursosMunicipalesTableDeleteSale from "./AlcaldiaRecursosMunicipalesTableDeleteSale";

function AlcaldiaRecursosMunicipalesVentasForm () {
  const history = useHistory();
  const isEditDefaultValue =
    history && history.location && history.location.state;
  const [isEdit] = useState(isEditDefaultValue);
  const [isSaleSaved, setIsSaleSaved] = useState(!!isEdit);
  const [isSaleSavedCounter, setIsSaleSavedCounter] = useState(0);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false);
  const [classNameFormText, setClassNameFormText] =
    useState(classNameFormTextNew);
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);
  const [verDetalles, setVerDetalles] = useState(false);
  const [idVenta, setIdVenta] = useState("");
  const [valueCreationDate, setValueCreationDate] = useState(undefined);
  const [updateTableDelete, setUpdateTableDelete] = useState(false);
  // Message states
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [messageTitle, setMessageTitle] = useState("");
  const [messageText, setMessageText] = useState("");
  const [valueVentaPrecioTotal, setValueVentaPrecioTotal] = useState(0);
  const [valueClienteDinero, setValueClienteDinero] = useState("0");
  const [valueClienteCambio, setValueClienteCambio] = useState("0");
  const [controlarEdit, setControlarEdit] = useState(true);
  const [ignore, setIgnore] = useState(true);
  const [isButtonComprobanteDisabled, setIsButtonComprobanteDisabled] = useState(true);
  const hideElement = false;
  const recursosMunicipalesVendidos = useRef();
  const newVentaDetalle = useRef();

  // Put default values:
  if (isEdit?.data.id && controlarEdit) {
    setVerDetalles(true);
    setIdVenta(isEdit.data.id);
    setValueCreationDate(isEdit.data.creationDate);
    setIsButtonComprobanteDisabled(false);
  }
  const numeroComprobante =
    isEdit && isEdit.data.numeroComprobante !== null
      ? isEdit.data.numeroComprobante
      : "";
  const clienteNombre =
    isEdit && isEdit.data.clienteNombre !== null
      ? isEdit.data.clienteNombre
      : "N/A";
  const clienteCiNit =
    isEdit && isEdit.data.clienteCiNit !== null ? isEdit.data.clienteCiNit : "0000000";
  const direccion =
    isEdit && isEdit.data.direccion !== null ? isEdit.data.direccion : "Colcapirhua";

  const glosa =
    isEdit && isEdit.data.glosa !== null ? isEdit.data.glosa : "";

  const nota = isEdit && isEdit.data.nota !== null ? isEdit.data.nota : "";
  const ventaStatus =
    isEdit && isEdit.data.ventaStatus !== null
      ? isEdit.data.ventaStatus
      : enumVentaStatus.ACTIVO;
  if (isEdit?.data !== undefined && controlarEdit) {
    setValueVentaPrecioTotal(isEdit.data.ventaPrecioTotal);
    setValueClienteDinero(isEdit.data.clienteDinero);
    setValueClienteCambio(isEdit.data.clienteCambio);
    setControlarEdit(false);
  }

  // Use custom hook
  const { value: valueClienteNombre, onChange: onChangeClienteNombre } =
    useInput(clienteNombre);
  const { value: valueNumeroComprobante, onChange: onChangeNumeroComprobante } =
    useInput(numeroComprobante);
  const { value: valueClienteCiNit, onChange: onChangeClienteCiNit } =
    useInput(clienteCiNit);
  const { value: valueDireccion, onChange: onChangeDireccion } =
    useInput(direccion);
  const { value: valueGlosa, onChange: onChangeGlosa } =
    useInput(glosa);
  const [valueNota, setValueNota] = useState(nota);
  const { value: valueVentaStatus, onChange: onChangeVentaStatus } =
    useInput(ventaStatus);

  const getBody = useCallback(
    function () {
      const username = window.sessionStorage.getItem("username");
      const tenant = window.sessionStorage.getItem("tenant");
      const body = {
        numeroComprobante: valueNumeroComprobante,
        clienteNombre: valueClienteNombre,
        clienteCiNit: valueClienteCiNit,
        direccion: valueDireccion,
        glosa: valueGlosa,
        nota: valueNota,
        ventaStatus: valueVentaStatus,
        ventaPrecioTotal: valueVentaPrecioTotal,
        clienteDinero: valueClienteDinero,
        clienteCambio: valueClienteCambio,
        tenant,
        createdBy: username,
        updatedBy: username
      };
      return body;
    },
    [
      valueNumeroComprobante,
      valueClienteNombre,
      valueClienteCiNit,
      valueDireccion,
      valueGlosa,
      valueNota,
      valueVentaStatus,
      valueVentaPrecioTotal,
      valueClienteDinero,
      valueClienteCambio
    ]
  );

  const handleAfterGetById = function (newVenta) {
    setValueCreationDate(newVenta.creationDate);
    setVerDetalles(true);
    setIsRequestInProgress(false);
    setIsButtonComprobanteDisabled(false);
  };

  const handleGetById = function (rmId) {
    handleGetRequest(`alcaldia-recursos-municipales-ventas/${rmId}`, handleAfterGetById, null, false);
  };

  const handleAfterAdd = function (newEntityId) {
    setIdVenta(newEntityId);
    handleGetById(newEntityId);
  };

  const handleAfterEdit = function () {
    setIsRequestInProgress(false);
  };

  const handleAdd = (event, clientCash) => {
    event?.preventDefault();
    const body = getBody();
    if (clientCash) {
      body.clienteCambio = "0";
      body.clienteDinero = "0";
      setValueClienteDinero("");
      setValueClienteCambio("");
    }
    const isValid = handleValidation(body, setClassNameFormText);
    if (isValid) {
      setIsSaleSavedCounter(isSaleSavedCounter + 1);
      setIsRequestInProgress(true);
      if (verDetalles) {
        handleEditRequest(
          "alcaldia-recursos-municipales-ventas/",
          body,
          idVenta,
          handleAfterEdit
        );
      } else {
        handleAddRequest(
          "alcaldia-recursos-municipales-ventas/",
          body,
          handleAfterAdd
        );
      }
      if (newVentaDetalle.current && recursosMunicipalesVendidos.current) {
        newVentaDetalle.current.forEach((element, index) => {
          const username = window.sessionStorage.getItem("username");
          const tenant = window.sessionStorage.getItem("tenant");
          const ventaDetalleBody = {
            idRecursoMunicipal: recursosMunicipalesVendidos.current.find(rm => rm.codigo === element.codigo && rm.name === element.name)?.id,
            idVenta,
            precioUnidad: element.precio,
            cantidad: element.nameAux,
            createdBy: username,
            updatedBy: username,
            tenant
          };
          handleEditRequest(
            "alcaldia-recursos-municipales-ventas-detalle/",
            ventaDetalleBody,
            element.id,
            handleAfterEdit,
            () => { },
            false
          );
        });
      }
    } else {
      setMessageTitle(i18n.errorMessages.validationErrorTitle);
      setMessageText(i18n.errorMessages.validationError);
      setIsMessageVisible(true);
    }
  };

  const handleChangeDataSumar = (price) => {
    setValueVentaPrecioTotal(Number(valueVentaPrecioTotal) + Number(price));
  };

  const handleChangeDataRestar = (price) => {
    setValueVentaPrecioTotal(Number(valueVentaPrecioTotal) - Number(price));
  };

  const afterDataComprobante = data => {
    const body = getBody();
    GeneratePdf(data, { ...body, valueCreationDate, idVenta });
    setIsRequestInProgress(false);
  };

  const handleComprobante = function () {
    setIsRequestInProgress(true);
    const tenant = window.sessionStorage.getItem("tenant");
    const filterBody = {
      tenantCriteria: tenant,
      tenantOperator: enumCompareOperators.TEXT_EQUALS
    };
    handleFilterRequest(`alcaldia/filter-by-ventas-id?ventasId=${idVenta}`, filterBody, afterDataComprobante);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  useEffect(() => {
    const body = getBody();
    handleValidation(body, setClassNameFormText);
  }, [getBody]);

  useEffect(() => {
    if (isSaleSavedCounter === 2) {
      setIsSaleSaved(true);
    }
    if (isSaleSavedCounter === 1 && !isEdit) {
      setIsSaveButtonDisabled(true);
    }
  }, [isSaleSavedCounter]);

  useEffect(() => {
    if (ignore) {
      setIgnore(false);
    } else if (verDetalles) {
      onChangeClienteDinero(valueVentaPrecioTotal.toString());
      // handleAdd(undefined, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueVentaPrecioTotal]);

  function onChangeClienteDinero (ClienteDinero) {
    setValueClienteCambio(Number(ClienteDinero) - valueVentaPrecioTotal);
    setValueClienteDinero(ClienteDinero);
  }

  if (isRequestInProgress) {
    return <CommonLoading></CommonLoading>;
  }

  return (
    <div className="">
      <CommonMessage
        isVisible={isMessageVisible}
        setIsVisible={setIsMessageVisible}
        titleText={messageTitle}
        bodyText={messageText}
        variant="danger"
      />
      <Card>
        <Card.Header as="h3">
          {i18n.alcaldiaRecursosMunicipalesVentasForm.title + `: ${idVenta}`}
        </Card.Header>
        <Card.Body>
          <div className="puggysoft-five-divs-side-by-side-child-container">
            <div className="puggysoft-five-divs-side-by-side-child">
              <Form.Group className="mb-3" controlId="numeroComprobante">
                <Form.Label>
                  {
                    i18n.alcaldiaRecursosMunicipalesVentasForm
                      .fieldNumeroComprobante
                  }
                </Form.Label>
                <Form.Control
                  onChange={onChangeNumeroComprobante}
                  value={valueNumeroComprobante}
                  type="number"
                  placeholder={
                    i18n.alcaldiaRecursosMunicipalesVentasForm
                      .fieldNumeroComprobante
                  }
                />
                <Form.Text muted className={classNameFormText.numeroComprobante}>
                  {
                    i18n.alcaldiaRecursosMunicipalesVentasForm
                      .fieldNumeroComprobanteText
                  }
                </Form.Text>
              </Form.Group>
            </div>
            <div className="puggysoft-five-divs-side-by-side-child">
              <Form.Group className="mb-3" controlId="clienteNombre">
                <Form.Label>
                  {
                    i18n.alcaldiaRecursosMunicipalesVentasForm
                      .fieldClienteNombre
                  }
                </Form.Label>
                <Form.Control
                  onChange={onChangeClienteNombre}
                  value={valueClienteNombre}
                  type="text"
                  placeholder={
                    i18n.alcaldiaRecursosMunicipalesVentasForm
                      .fieldClienteNombre
                  }
                />
                <Form.Text muted className={classNameFormText.clienteNombre}>
                  {
                    i18n.alcaldiaRecursosMunicipalesVentasForm
                      .fieldClienteNombreText
                  }
                </Form.Text>
              </Form.Group>
            </div>
            <div className="puggysoft-five-divs-side-by-side-child">
              <Form.Group className="mb-3" controlId="clienteCiNit">
                <Form.Label>
                  {i18n.alcaldiaRecursosMunicipalesVentasForm.fieldClienteCiNit}
                </Form.Label>
                <Form.Control
                  onChange={onChangeClienteCiNit}
                  value={valueClienteCiNit}
                  type="number"
                  placeholder={
                    i18n.alcaldiaRecursosMunicipalesVentasForm.fieldClienteCiNit
                  }
                />
                <Form.Text muted className={classNameFormText.clienteCiNit}>
                  {
                    i18n.alcaldiaRecursosMunicipalesVentasForm
                      .fieldClienteCiNitText
                  }
                </Form.Text>
              </Form.Group>
            </div>
            <div className="puggysoft-five-divs-side-by-side-child">
              <Form.Group className="mb-3" controlId="direccion">
                <Form.Label>
                  {i18n.alcaldiaRecursosMunicipalesVentasForm.fieldDireccion}
                </Form.Label>
                <Form.Control
                  onChange={onChangeDireccion}
                  value={valueDireccion}
                  type="text"
                  placeholder={
                    i18n.alcaldiaRecursosMunicipalesVentasForm.fieldDireccion
                  }
                />
                <Form.Text muted className={classNameFormText.direccion}>
                  {
                    i18n.alcaldiaRecursosMunicipalesVentasForm
                      .fieldDireccionText
                  }
                </Form.Text>
              </Form.Group>
            </div>
            <div className="puggysoft-five-divs-side-by-side-child">
              <Form.Group className="mb-3" controlId="nota">
                <Form.Label>
                  {i18n.alcaldiaRecursosMunicipalesVentasForm.fieldNota}
                </Form.Label>
                <Form.Control
                  style={{ resize: "none" }}
                  disabled
                  value={valueNota}
                  as="textarea"
                  placeholder={
                    i18n.alcaldiaRecursosMunicipalesVentasForm.fieldNota
                  }
                />
              </Form.Group>
            </div>
          </div>
          <div className="puggysoft-five-divs-side-by-side-child-container">
            <div className="puggysoft-five-divs-side-by-side-child">
              <Form.Group className="mb-3" controlId="ventaStatus">
                <Form.Label>
                  {i18n.alcaldiaRecursosMunicipalesVentasForm.fieldVentaStatus}
                </Form.Label>
                <Form.Select
                  onChange={onChangeVentaStatus}
                  disabled
                  value={valueVentaStatus}
                >
                  <option key="option-activo" value={enumVentaStatus.ACTIVO}>
                    {i18n.alcaldiaVentaStatusText.activo}
                  </option>
                  <option key="option-anulado" value={enumVentaStatus.ANULADO}>
                    {i18n.alcaldiaVentaStatusText.anulado}
                  </option>
                </Form.Select>
                <Form.Text muted className={classNameFormText.ventaStatus}>
                  {
                    i18n.alcaldiaRecursosMunicipalesVentasForm
                      .formTextVentaStatus
                  }
                </Form.Text>
              </Form.Group>
            </div>
            {verDetalles && (
              <div className="puggysoft-six-divs-side-by-side-child">
                <Form.Group className="mb-3" controlId="ventaPrecioTotal">
                  <Form.Label>
                    {
                      i18n.alcaldiaRecursosMunicipalesVentasForm
                        .fieldVentaPrecioTotal
                    }
                  </Form.Label>
                  <Form.Control
                    value={valueVentaPrecioTotal}
                    type="number"
                    disabled
                    placeholder={
                      i18n.alcaldiaRecursosMunicipalesVentasForm
                        .fieldVentaPrecioTotal
                    }
                  />
                  <Form.Text
                    muted
                    className={classNameFormText.ventaPrecioTotal}
                  >
                    {
                      i18n.alcaldiaRecursosMunicipalesVentasForm
                        .fieldVentaPrecioTotalText
                    }
                  </Form.Text>
                </Form.Group>
              </div>
            )}
            {hideElement && verDetalles && (
              <div className="puggysoft-six-divs-side-by-side-child">
                <Form.Group className="mb-3" controlId="clienteDinero">
                  <Form.Label>
                    {
                      i18n.alcaldiaRecursosMunicipalesVentasForm
                        .fieldClienteDinero
                    }
                  </Form.Label>
                  <Form.Control
                    onChange={(event) => {
                      onChangeClienteDinero(event.target.value);
                    }}
                    value={valueClienteDinero}
                    type="number"
                    placeholder={
                      i18n.alcaldiaRecursosMunicipalesVentasForm
                        .fieldClienteDinero
                    }
                  />
                  <Form.Text muted className={classNameFormText.clienteDinero}>
                    {
                      i18n.alcaldiaRecursosMunicipalesVentasForm
                        .fieldClienteDineroText
                    }
                  </Form.Text>
                </Form.Group>
              </div>
            )}
            {hideElement && verDetalles && (
              <div className="puggysoft-six-divs-side-by-side-child">
                <Form.Group className="mb-3" controlId="clienteCambio">
                  <Form.Label>
                    {
                      i18n.alcaldiaRecursosMunicipalesVentasForm
                        .fieldClienteCambio
                    }
                  </Form.Label>
                  <Form.Control
                    value={valueClienteCambio}
                    type="number"
                    disabled
                    placeholder={
                      i18n.alcaldiaRecursosMunicipalesVentasForm
                        .fieldClienteCambio
                    }
                  />
                  <Form.Text muted className={classNameFormText.clienteCambio}>
                    {
                      i18n.alcaldiaRecursosMunicipalesVentasForm
                        .fieldClienteCambioText
                    }
                  </Form.Text>
                </Form.Group>
              </div>
            )}
            {verDetalles && (
              <div className="puggysoft-six-divs-side-by-side-child">
                <Form.Group className="mb-3" controlId="glosa">
                  <Form.Label>
                    {i18n.alcaldiaRecursosMunicipalesVentasForm.fieldGlosa}
                  </Form.Label>
                  <Form.Control
                    onChange={onChangeGlosa}
                    value={valueGlosa}
                    as="textarea"
                    placeholder={
                      i18n.alcaldiaRecursosMunicipalesVentasForm.fieldGlosa
                    }
                  />
                  <Form.Text muted className={classNameFormText.glosa}>
                    {
                      i18n.alcaldiaRecursosMunicipalesVentasForm
                        .fieldGlosaText
                    }
                  </Form.Text>
                </Form.Group>
              </div>
            )}
            <div className="puggysoft-six-divs-side-by-side-child">
              <Button
                disabled={isSaveButtonDisabled}
                onClick={handleAdd}
                variant={isSaleSaved ? "success" : "primary"}
                type="button"
                className="puggysoft-button-inline"
              >
                {isSaleSaved ? i18n.commonForm.savedButton : i18n.commonForm.saveButton}
              </Button>
            </div>
            <div className="puggysoft-six-divs-side-by-side-child">
              <Button
                disabled={isButtonComprobanteDisabled || !isSaleSaved}
                onClick={handleComprobante}
                variant={isSaleSaved ? "success" : "primary"}
                type="button"
                className="puggysoft-button-inline"
              >
                {i18n.alcaldiaRecursosMunicipalesVentasForm.buttonComprobante}
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
      {verDetalles && (
        <div>
          <div className="puggysoft-two-divs-side-by-side-child">
            <AlcaldiaRecursosMunicipalesTableAddSale
              setValueNota={setValueNota}
              ventasId={idVenta}
              setUpdateTableDelete={setUpdateTableDelete}
              handleChangeData={handleChangeDataSumar}
              setValueVentaPrecioTotal={setValueVentaPrecioTotal}
              setValueClienteCambio={setValueClienteCambio}
              valueVentaPrecioTotal={valueVentaPrecioTotal}
              setIsSaveButtonDisabled={setIsSaveButtonDisabled}
              recursosMunicipalesVendidos={recursosMunicipalesVendidos}
            />
          </div>
          <div className="puggysoft-two-divs-side-by-side-child">
            <AlcaldiaRecursosMunicipalesTableDeleteSale
              ventasId={idVenta}
              setUpdateTableDelete={setUpdateTableDelete}
              updateTableDelete={updateTableDelete}
              setValueVentaPrecioTotal={setValueVentaPrecioTotal}
              valueVentaPrecioTotal={valueVentaPrecioTotal}
              setValueClienteCambio={setValueClienteCambio}
              handleChangeData={handleChangeDataRestar}
              newVentaDetalle={newVentaDetalle}
              isEdit={!!isEdit}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AlcaldiaRecursosMunicipalesVentasForm;
