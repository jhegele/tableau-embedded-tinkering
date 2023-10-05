"use client";

import React, { useEffect, useState } from "react";
import { Tableau } from "@/components/tableau";
import { Flex, styled } from "#/jsx";
import { css } from "#/css";

const Home = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  return (
    <Flex direction="column" w="full" alignItems="center">
      <Flex w="2/3" p={4} alignItems="center">
        <styled.p fontSize="2xl" fontWeight="bold" color="slate.600" flex={1}>
          Simple Embedding
        </styled.p>
      </Flex>
      <Flex w="2/3" bg="slate.100" p={4} borderRadius="md" mb={4}>
        <styled.p fontSize="normal" color="slate.700">
          This simple embedding example uses a custom React component to embed a
          Tableau visualization hosted on Tableau Public. No additional
          interactivity is added so all controls are housed inside the viz
          itself.
        </styled.p>
      </Flex>
      <Flex w="2/3">
        <Tableau
          src="https://public.tableau.com/views/Superstore-EmbedDemo/SuperDescriptive?:language=en-US&:display_count=n&:origin=viz_share_link"
          hideTabs
          width="100%"
          className={css({ w: "full" })}
        />
      </Flex>
    </Flex>
  );
};

export default Home;
