import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
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

const baseUrl = "http://localhost:4321"

export default function SampleEmail({
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
      <Body style={main}>
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={imageSection}>
              <Img
                src={`${baseUrl}/favicon.png`}
                width="75"
                height="75"
                alt="Logo del Camposanto Santa Rosa"
              />
            </Section>
            <Section style={upperSection}>
              <Heading style={h1}>{`Campo Santo Santa Rosa de Lima | ${servicio}`}</Heading>
              <Text style={mainText}>{intencion}</Text>
            </Section>
            <Hr />
            <Section style={lowerSection}>
              <Text style={paragraph}>
                <b>Nombre: </b>
                {nombre}
              </Text>
              <Text style={{ ...paragraph, marginTop: -5 }}>
                <b>Correo: </b>
                {correo}
              </Text>
              <Text style={{ ...paragraph, marginTop: -5 }}>
                <b>Servicio: </b>
                {servicio}
              </Text>
              <Text style={{ ...paragraph, marginTop: -5 }}>
                <b>Fallecido: </b>
                {fallecido}
              </Text>
            </Section>
            <Hr />
            <Section style={lowerSection}>
              <Text style={paragraph}>
                <b>Hora de inicio: </b>
                {horaInicio}
              </Text>
              <Text style={{ ...paragraph, marginTop: -5 }}>
                <b>Hora de cierre: </b>
                {horaFin}
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: "#fff",
  color: "#212121",
}

const container = {
  padding: "20px",
  margin: "0 auto",
  backgroundColor: "#eee",
}

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "15px",
}

const link = {
  color: "#2754C5",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  textDecoration: "underline",
}

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
}

const imageSection = {
  backgroundColor: "#ffffff",
  display: "flex",
  padding: "20px 0",
  alignItems: "center",
  justifyContent: "center",
}

const coverSection = { backgroundColor: "#fff" }

const upperSection = { padding: "25px 35px" }

const lowerSection = { padding: "25px 35px" }

const mainText = { ...text, marginBottom: "14px" }
const paragraph = {
  fontSize: 16,
}

const cautionText = { ...text, margin: "0px" }
