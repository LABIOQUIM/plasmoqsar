"use client";
import { Equation } from "react-equation";
import { Avatar, Box, List, ListItem, Paper, Text, Title } from "@mantine/core";
import Link from "next/link";

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
      lattes: "http://lattes.cnpq.br/0564343474986429",
    },
    {
      name: "Railton Marques de Souza Guimarães",
      photo: railtonImg,
      lattes: "http://lattes.cnpq.br/2959548571209633",
    },
    {
      name: "Ivo Henrique Provensi Vieira",
      photo: ivoImg,
      lattes: "http://lattes.cnpq.br/5130583751808996",
    },
  ];

  return (
    <PageLayout>
      <Logo />
      <Text>
        <b>PlasmoQSAR</b> is an application that calculates the pEC50 value (and
        EC50%) against plasmodium falciparum that causes malaria using the
        analytical equation below. This equation was developed using machine
        learning by applying QSAR to a set of descriptors of molecules already
        tested against Plasmodium falciparum. The descriptors are provided by
        the free software Mold2
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
      <Text>
        Please, when using PlasmoQSAR, also cite: Hong, H., Slavov, S., Ge, W.,
        Qian, F., Su, Z., Fang, H., Cheng, Y., Perkins, R., Shi, L., & Tong, W.
        (2012). Mold2 Molecular Descriptors for QSAR. In Statistical Modelling
        of Molecular Descriptors in QSAR/QSPR (eds M. Dehmer, F. Emmert-Streib,
        M. Dehmer, K. Varmuza and D. Bonchev).{" "}
        <Link href="https://doi.org/10.1002/9783527645121.ch3">
          https://doi.org/10.1002/9783527645121.ch3
        </Link>
      </Text>
      <Title mt="md" order={4}>
        PlasmoQSAR is maintained by
      </Title>

      <Box className={mClasses.container}>
        {maintainers.map((maintainer) => (
          <Paper
            component={Link}
            className={mClasses.paperContainer}
            key={maintainer.name}
            href={maintainer.lattes}
            withBorder
          >
            <Avatar src={maintainer.photo.src} size="lg" />
            <Title order={5} ta="center">
              {maintainer.name}
            </Title>
          </Paper>
        ))}
      </Box>

      <Title mt="mt" order={4}>
        Contact
      </Title>
      <Text>
        If needed you can contact{" "}
        <Link href="mailto:fernando.zanchi@fiocruz.br">
          fernando.zanchi@fiocruz.br
        </Link>
      </Text>
    </PageLayout>
  );
}
