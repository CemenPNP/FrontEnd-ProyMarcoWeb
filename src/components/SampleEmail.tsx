import {
  Body,
  Button,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components"

interface SampleEmailProps {
  nombre: string
  correo: string
  servicio: string
  fallecido: string
  intencion: string
  horaInicio: string
  horaFin: string
}

export function SampleEmail({
  nombre,
  correo,
  servicio,
  fallecido,
  intencion,
  horaInicio,
  horaFin,
}: SampleEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{`Campo Santo Santa Rosa de Lima | ${servicio}`}</Preview>
      <Body>
        <Section>
          <Row>
            <Column>
              <Img
                src="http://localhost:4321/favicon.png"
                width="60"
                height="60"
                alt="Logo Camposanto Santa Rosa de Lima"
              />
            </Column>
            <Column align="left" style={{ display: "table-cell" }}>
              <Heading
                as="h1"
                style={{
                  textTransform: "uppercase",
                  fontSize: 20,
                  lineHeight: "36px",
                  marginBottom: "0px",
                  fontWeight: 600,
                }}
              >
                Camposanto Santa Rosa de Lima
              </Heading>
            </Column>
          </Row>
        </Section>
        <Hr style={{ borderColor: "#e6ebf1", margin: "20px 0" }} />
        <Section
          style={{ paddingTop: 16, paddingBottom: 16, textAlign: "center" }}
        >
          <Heading
            as="h2"
            style={{
              fontSize: 20,
              lineHeight: "36px",
              marginBottom: "0px",
              fontWeight: 600,
            }}
          >
            {servicio}
          </Heading>
          <Section
            style={{
              padding: 16,
              paddingTop: "0px",
              marginTop: 16,
              marginBottom: 16,
              borderRadius: 8,
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "rgb(229,231,235)",
            }}
          >
            <table style={{ marginBottom: 16 }} width="100%">
              <tr>
                <td
                  align="center"
                  style={{
                    paddingTop: 8,
                    paddingBottom: 8,
                    borderWidth: "0px",
                    borderBottomWidth: 1,
                    borderStyle: "solid",
                    borderColor: "rgb(229,231,235)",
                  }}
                >
                  <Text>Usuario</Text>
                </td>
                <td
                  align="center"
                  style={{
                    paddingTop: 8,
                    paddingBottom: 8,
                    borderWidth: "0px",
                    borderBottomWidth: 1,
                    borderStyle: "solid",
                    borderColor: "rgb(229,231,235)",
                  }}
                >
                  <Text>{nombre}</Text>
                </td>
              </tr>
              <tr>
                <td
                  align="center"
                  style={{
                    paddingTop: 8,
                    paddingBottom: 8,
                    borderWidth: "0px",
                    borderBottomWidth: 1,
                    borderStyle: "solid",
                    borderColor: "rgb(229,231,235)",
                  }}
                >
                  <Text>Correo</Text>
                </td>
                <td
                  align="center"
                  style={{
                    paddingTop: 8,
                    paddingBottom: 8,
                    borderWidth: "0px",
                    borderBottomWidth: 1,
                    borderStyle: "solid",
                    borderColor: "rgb(229,231,235)",
                  }}
                >
                  <Text>{correo}</Text>
                </td>
              </tr>
              <tr>
                <td
                  align="center"
                  style={{
                    paddingTop: 8,
                    paddingBottom: 8,
                    borderWidth: "0px",
                    borderBottomWidth: 1,
                    borderStyle: "solid",
                    borderColor: "rgb(229,231,235)",
                  }}
                >
                  <Text>Servicio</Text>
                </td>
                <td
                  align="center"
                  style={{
                    paddingTop: 8,
                    paddingBottom: 8,
                    borderWidth: "0px",
                    borderBottomWidth: 1,
                    borderStyle: "solid",
                    borderColor: "rgb(229,231,235)",
                  }}
                >
                  <Text>{servicio}</Text>
                </td>
              </tr>
              <tr>
                <td
                  align="center"
                  style={{
                    paddingTop: 8,
                    paddingBottom: 8,
                    borderWidth: "0px",
                    borderBottomWidth: 1,
                    borderStyle: "solid",
                    borderColor: "rgb(229,231,235)",
                  }}
                >
                  <Text>Difunto</Text>
                </td>
                <td
                  align="center"
                  style={{
                    paddingTop: 8,
                    paddingBottom: 8,
                    borderWidth: "0px",
                    borderBottomWidth: 1,
                    borderStyle: "solid",
                    borderColor: "rgb(229,231,235)",
                  }}
                >
                  <Text>{fallecido}</Text>
                </td>
              </tr>
              <tr>
                <td
                  align="center"
                  style={{
                    paddingTop: 8,
                    paddingBottom: 8,
                    borderWidth: "0px",
                    borderBottomWidth: 1,
                    borderStyle: "solid",
                    borderColor: "rgb(229,231,235)",
                  }}
                >
                  <Text>Intencion</Text>
                </td>
                <td
                  align="center"
                  style={{
                    paddingTop: 8,
                    paddingBottom: 8,
                    borderWidth: "0px",
                    borderBottomWidth: 1,
                    borderStyle: "solid",
                    borderColor: "rgb(229,231,235)",
                  }}
                >
                  <Text>{intencion}</Text>
                </td>
              </tr>
              <tr>
                <td
                  align="center"
                  style={{
                    paddingTop: 8,
                    paddingBottom: 8,
                    borderWidth: "0px",
                    borderBottomWidth: 1,
                    borderStyle: "solid",
                    borderColor: "rgb(229,231,235)",
                  }}
                >
                  <Text>Hora de Inicio</Text>
                </td>
                <td
                  align="center"
                  style={{
                    paddingTop: 8,
                    paddingBottom: 8,
                    borderWidth: "0px",
                    borderBottomWidth: 1,
                    borderStyle: "solid",
                    borderColor: "rgb(229,231,235)",
                  }}
                >
                  <Text>{horaInicio}</Text>
                </td>
              </tr>
              <tr>
                <td
                  align="center"
                  style={{
                    paddingTop: 8,
                    paddingBottom: 8,
                    borderWidth: "0px",
                    borderBottomWidth: 1,
                    borderStyle: "solid",
                    borderColor: "rgb(229,231,235)",
                  }}
                >
                  <Text>Hora de cierre</Text>
                </td>
                <td
                  align="center"
                  style={{
                    paddingTop: 8,
                    paddingBottom: 8,
                    borderWidth: "0px",
                    borderBottomWidth: 1,
                    borderStyle: "solid",
                    borderColor: "rgb(229,231,235)",
                  }}
                >
                  <Text>{horaFin}</Text>
                </td>
              </tr>
            </table>
            <Row>
              <Column align="center">
                <Button
                  href="http://localhost:4321"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    paddingLeft: 12,
                    paddingRight: 12,
                    borderRadius: 8,
                    textAlign: "center",
                    backgroundColor: "#009970",
                    paddingTop: 12,
                    paddingBottom: 12,
                    fontWeight: 600,
                    color: "rgb(255,255,255)",
                  }}
                >
                  Realiza mas reservas desde nuestra pagina web!
                </Button>
              </Column>
            </Row>
          </Section>
        </Section>
      </Body>
    </Html>
  )
}

export default SampleEmail