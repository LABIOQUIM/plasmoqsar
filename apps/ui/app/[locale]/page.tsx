"use client";
import { Equation } from "react-equation";
import { Avatar, Box, List, ListItem, Paper, Text, Title } from "@mantine/core";

import fernandoImg from "@/assets/maintainers/fernando.jpg";
import ivoImg from "@/assets/maintainers/ivo.jpg";
import railtonImg from "@/assets/maintainers/railton.jpeg";
import { Logo } from "@/components/Logo";
import { PageLayout } from "@/components/PageLayout";

import mClasses from "./Maintainers.module.css";

export default async function Home() {
  const maintainers = [
    {
      name: "Dr. Fernando B. Zanchi",
      photo: fernandoImg,
    },
    {
      name: "Railton Marques de Souza Guimarães",
      photo: railtonImg,
    },
    {
      name: "Ivo Vieira",
      photo: ivoImg,
    },
  ];

  return (
    <PageLayout>
      <Logo />
      <Text>
        <b>PlasmoQSAR</b> is an application that calculates the pEC50 value (and
        EC50%) against plasmodium falciparum that causes malaria using the
        analytical equation below. This equation was developed using machine
        learning by applying QSAR to a set of molecules already tested against
        Plasmodium falciparum
      </Text>
      <Title order={4}>Equation</Title>
      <List>
        <ListItem>A = Descriptor D143</ListItem>
        <ListItem>B = Descriptor D312</ListItem>
        <ListItem>C = Descriptor D470</ListItem>
      </List>
      <Box>
        <Equation value="pEC50 = 55.846*A + 460.630*B + 1576.396*C - 1.988*A^2 - 22.908*A*B - 53.923*A*C- 39.867*B^2 - 1167.069*B*C - 1428.253*C^2 + 0.026*A^3 + 0.865*A^2*B + 1.231*A^2*C - 3.654*A*B^2 + 15.510*A*B*C + 19.711*A*C^2 + 10.991*B^3 + 251.547*B^2*C^3 + 985.497*B*C^2 + 530.744*C^3 + 0.000*A^4 - 0.014*A^3 *B -0.017*A^3*C + 0.095*A^2*B^2 - 0.035*A^2*B*C + 0.018*A^2*C^2 - 0.317*A*B^3 - 0.805*A*B^2*C - 7.912*A*B*C^2 - 4.020*A*C^3 + 0.677*B^4 - 12.668*B^3*C - 144.091*B^2*C^2 - 206.850*B*C^3 - 62.484*C^4 - 743.635" />
      </Box>
      <Title mt="md" order={4}>
        PlasmoQSAR is maintained by
      </Title>

      <Box className={mClasses.container}>
        {maintainers.map((maintainer) => (
          <Paper
            className={mClasses.paperContainer}
            key={maintainer.name}
            withBorder
          >
            <Avatar src={maintainer.photo.src} size="lg" />
            <Title order={5} ta="center">
              {maintainer.name}
            </Title>
          </Paper>
        ))}
      </Box>
    </PageLayout>
  );
}
