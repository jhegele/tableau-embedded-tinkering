"use client";

import React, { useEffect, useRef, useState } from "react";
import { Tableau } from "@/components/tableau";
import { TableauViz } from "https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js";
import { Flex, styled } from "#/jsx";
import Link from "next/link";
import { css } from "#/css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schemaControls = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  region: z.enum(["US", "Central", "East", "South", "West"]),
  // dateComparison: z.enum(["Prior Period", "Prior Year"]),
  // dateGranularity: z.enum(["Week", "Month", "Quarter", "Year"]),
});

const Home = () => {
  const { register, reset } = useForm<z.infer<typeof schemaControls>>({
    resolver: zodResolver(schemaControls),
    mode: "onBlur",
  });
  const viz = useRef<TableauViz | null>(null);

  const handleOnFirstInteractive = async (interactiveViz: TableauViz) => {
    viz.current = interactiveViz;
    const params = await viz.current.workbook.getParametersAsync();
    const pMinDate = params.find((p) => p.name === "Minimum Date");
    const pMaxDate = params.find((p) => p.name === "Maximum Date");
    const pRegion = params.find((p) => p.name === "Region Parameter");
    // const pDateComparison = params.find((p) => p.name === "Date Comparison");
    // const pDateGranularity = params.find((p) => p.name === "Date Granularity");
    reset({
      startDate: pMinDate?.currentValue.value || "",
      endDate: pMaxDate?.currentValue.value || "",
      region: pRegion?.currentValue.value || "",
      // dateComparison: pDateComparison?.currentValue.value || "",
      // dateGranularity: pDateGranularity?.currentValue.value || "",
    });
  };

  const handleParamUpdate = (
    paramName: string,
    newValue: string | number | boolean | Date
  ) => {
    if (!viz.current) return;
    viz.current.workbook.changeParameterValueAsync(paramName, newValue);
  };

  return (
    <Flex direction="column" alignItems="center">
      <Flex w="2/3" p={4} alignItems="center">
        <styled.p fontSize="2xl" fontWeight="bold" color="slate.600" flex={1}>
          Improved Embedding
        </styled.p>
        <Link href="/simple">Go to Simple</Link>
      </Flex>
      <Flex w="2/3" bg="slate.100" p={4} borderRadius="md" mb={4}>
        <styled.p fontSize="normal" color="slate.700">
          The improved embedding moves controls out of the visualization and
          renders them as part of the web application. This allows for a more
          seamless experience where the viz feels like a native part of the
          application.
        </styled.p>
      </Flex>
      <Flex direction="row" w="full" gap={4} px={8}>
        <Flex
          w={96}
          minW={96}
          direction="column"
          p={4}
          borderRadius="md"
          border="1px solid token(colors.slate.600)"
        >
          <Flex direction="column" gap={2} w="full">
            <Flex direction="column" w="full">
              <styled.label
                htmlFor="startDate"
                fontSize="sm"
                fontWeight="semibold"
                color="slate.500"
              >
                Start date
              </styled.label>
              <styled.input
                id="startDate"
                fontSize="normal"
                border="1px solid token(colors.slate.600)"
                borderRadius="md"
                px={2}
                py={1}
                _focus={{
                  outline: "1px solid token(colors.blue.500)",
                }}
                _hover={{
                  border: "1px solid token(colors.slate.400)",
                }}
                type="date"
                {...register("startDate", {
                  valueAsDate: true,
                  onBlur: ({ target: { value } }) =>
                    handleParamUpdate("Minimum Date", value),
                })}
              />
            </Flex>
            <Flex direction="column" w="full">
              <styled.label
                htmlFor="endDate"
                fontSize="sm"
                fontWeight="semibold"
                color="slate.500"
              >
                End date
              </styled.label>
              <styled.input
                id="endDate"
                fontSize="normal"
                border="1px solid token(colors.slate.600)"
                borderRadius="md"
                px={2}
                py={1}
                _focus={{
                  outline: "1px solid token(colors.blue.500)",
                }}
                _hover={{
                  border: "1px solid token(colors.slate.400)",
                }}
                type="date"
                {...register("endDate", {
                  valueAsDate: true,
                  onBlur: ({ target: { value } }) =>
                    handleParamUpdate("Maximum Date", value),
                })}
              />
            </Flex>
            <Flex direction="column" w="full">
              <styled.label
                htmlFor="region"
                fontSize="sm"
                fontWeight="semibold"
                color="slate.500"
              >
                Region
              </styled.label>
              <styled.input
                id="region"
                fontSize="normal"
                border="1px solid token(colors.slate.600)"
                borderRadius="md"
                px={2}
                py={1}
                _focus={{
                  outline: "1px solid token(colors.blue.500)",
                }}
                _hover={{
                  border: "1px solid token(colors.slate.400)",
                }}
                type="text"
                {...register("region", {
                  onBlur: ({ target: { value } }) =>
                    handleParamUpdate("Region Parameter", value),
                })}
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex flex={1} direction="column">
          <Tableau
            src="https://public.tableau.com/views/Superstore-EmbedDemo-Improved/SuperDescriptive?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link"
            hideTabs
            onFirstInteractive={handleOnFirstInteractive}
            className={css({ w: "full", maxW: "full" })}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
