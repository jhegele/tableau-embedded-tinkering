"use client";

import React from "react";
import { Tableau } from "@/components/tableau";
import { TableauViz } from "https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js";
import { Flex } from "#/jsx";

const Home = () => {
  const handleOnFirstInteractive = (viz: TableauViz) => {
    console.log("interactive!");
  };

  return (
    <Flex direction="row" w="full">
      <Flex w={96} minW={96} direction="column">
        Controls
      </Flex>
      <Flex flex={1} minW="full">
        <Tableau
          src="https://public.tableau.com/views/Superstore-EmbedDemo/SuperDescriptive?:language=en-US&:display_count=n&:origin=viz_share_link"
          hideTabs
          onFirstInteractive={handleOnFirstInteractive}
        />
      </Flex>
    </Flex>
  );
};

export default Home;
