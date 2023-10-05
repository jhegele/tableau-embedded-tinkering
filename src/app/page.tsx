"use client";

import React from "react";
import { Tableau } from "@/components/tableau";
import { TableauViz } from "https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js";
import { Flex, styled } from "#/jsx";
import Link from "next/link";

const Home = () => {
  const handleOnFirstInteractive = (viz: TableauViz) => {
    console.log("interactive!");
  };

  return (
    <Flex direction="column" w="full" alignItems="center" pt={12}>
      <Flex direction="column" w="1/2">
        <styled.p
          fontSize="2xl"
          fontWeight="bold"
          color="slate.600"
          flex={1}
          mb={8}
        >
          Tableau Embedding API Tinkering
        </styled.p>
        <Flex w="full" direction="row">
          <Flex
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            flex={1}
            minW={96}
            borderRight="1px solid token(colors.slate.400)"
            gap={4}
          >
            <styled.p color="slate.600">
              This space is meant as an area to tinker and experiment with
              Tableau&apos;s new(-ish) Embedding API. The visualizations used
              here are vizzes that I pulled from Tableau Public and are not my
              work.
            </styled.p>
            <styled.p color="slate.600">
              The links on the right will take you to the various embed
              showcases. Starting at the top and moving down, the links get more
              nuanced and/or complex.
            </styled.p>
          </Flex>
          <Flex direction="column">
            <Flex
              flex={1}
              direction="row"
              justifyContent="flex-start"
              px={3}
              py={2}
            >
              <Link href="./simple">Simple</Link>
            </Flex>
            <Flex
              flex={1}
              direction="row"
              justifyContent="flex-start"
              px={3}
              py={2}
            >
              <Link href="./improved">Improved</Link>
            </Flex>
            <Flex
              flex={1}
              direction="row"
              justifyContent="flex-start"
              px={3}
              py={2}
            >
              <Link href="./advanced">Advanced</Link>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
