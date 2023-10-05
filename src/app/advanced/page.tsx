"use client";

import React, { useEffect, useRef, useState } from "react";
import { Tableau } from "@/components/tableau";
import { TableauViz } from "https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js";
import { Box, Container, Flex, styled } from "#/jsx";
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

const Advanced = () => {
  const { register, reset } = useForm<z.infer<typeof schemaControls>>({
    resolver: zodResolver(schemaControls),
    mode: "onBlur",
  });
  const vizSalesSummary = useRef<TableauViz | null>(null);
  const vizProfitRatioSummary = useRef<TableauViz | null>(null);
  const viz = useRef<TableauViz | null>(null);

  const handleOnFirstInteractive = async (
    interactiveViz: TableauViz,
    ref: React.MutableRefObject<TableauViz | null>
  ) => {
    ref.current = interactiveViz;
    const params = await ref.current.workbook.getParametersAsync();
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

  const salesHandleOnFirstInteractive = (interactiveViz: TableauViz) => {
    handleOnFirstInteractive(interactiveViz, vizSalesSummary);
  };

  const profitRatioHandleOnFirstInteractive = (interactiveViz: TableauViz) => {
    handleOnFirstInteractive(interactiveViz, vizProfitRatioSummary);
  };

  const handleParamUpdate = (
    paramName: string,
    newValue: string | number | boolean | Date
  ) => {
    if (!vizSalesSummary.current || !vizProfitRatioSummary.current) return;
    vizSalesSummary.current.workbook.changeParameterValueAsync(
      paramName,
      newValue
    );
    vizProfitRatioSummary.current.workbook.changeParameterValueAsync(
      paramName,
      newValue
    );
  };

  return (
    <Flex direction="column" alignItems="center" pb={24}>
      <Flex w="2/3" p={4} alignItems="center">
        <styled.p fontSize="2xl" fontWeight="bold" color="slate.600" flex={1}>
          Advanced Embedding
        </styled.p>
        <Link href="/simple">Go to Simple</Link>
      </Flex>
      <Flex w="2/3" bg="slate.100" p={4} borderRadius="md" mb={4}>
        <styled.p fontSize="normal" color="slate.700">
          Advanced Embedding allows full user engagement and makes what was a
          single dashboard a fully integrated part of the application. This
          allows developers to layout the components of the dashboard in a way
          that makes sense with the broader application.
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
          h="fit-content"
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
        <Flex direction="column" gap={8}>
          <Flex flex={1} direction="column">
            <Container w="full">
              <Box w="275px" h="275px" maxH="275px" float="right" p={2}>
                <Tableau
                  src="https://public.tableau.com/shared/K3ZPJF37X?:display_count=n&:origin=viz_share_link"
                  hideTabs
                  onFirstInteractive={salesHandleOnFirstInteractive}
                  className={css({
                    w: "275px",
                    maxW: "275px",
                    h: "275px",
                    maxH: "275px",
                  })}
                  id="tableauViz_SalesSummary"
                />
              </Box>
              <styled.p whiteSpace="pre-wrap">
                <styled.span
                  fontSize="xl"
                  fontWeight="bold"
                  color="blue.500"
                  display="block"
                >
                  Sales Summary
                </styled.span>
                Lorem ipsum odor amet, consectetuer adipiscing elit. Venenatis
                at lorem gravida blandit diam nascetur neque. Habitant morbi
                nisl sit arcu pharetra sed libero. Per eget nisi non quam nisl.
                Fermentum nibh eleifend curae nascetur curae orci auctor dis.
                Sit quisque massa non nascetur eu. Vitae lobortis ex egestas
                himenaeos morbi tristique sollicitudin. Tempor libero vulputate
                penatibus fames, inceptos justo iaculis litora. <br />
                <br />
                Vehicula in torquent aliquam facilisi vel magna senectus proin
                quam. Massa taciti sodales sociosqu nisl natoque consectetur.
                Lobortis ante nam libero magnis, pretium placerat. Felis est
                placerat conubia convallis cursus est. Lectus bibendum eros
                malesuada bibendum per pulvinar ligula quis justo. Ipsum cras
                suspendisse ac quis faucibus erat quisque. Curae orci cras nec
                fermentum viverra ultrices est. Sodales magnis eleifend natoque
                auctor efficitur leo. Ultrices efficitur sapien fames metus,
                sollicitudin accumsan magna feugiat finibus. <br />
                <br />
                Donec id conubia odio sem porttitor. Posuere ullamcorper ad nec
                cursus sed parturient. Vehicula neque parturient ex scelerisque
                dignissim curabitur augue ut. Praesent potenti egestas eros
                imperdiet amet nisl interdum accumsan accumsan. Suspendisse
                lacinia libero ullamcorper sodales lacinia pharetra tellus
                hendrerit. Leo ut primis etiam sem nostra suscipit posuere.
                Viverra aliquam maecenas adipiscing ullamcorper pharetra
                efficitur. Nascetur feugiat dis justo eget litora pellentesque.
                Vivamus tortor odio aptent molestie quis porta. Risus viverra
                augue luctus at sagittis massa nullam. Adipiscing natoque
                suscipit nibh at dictumst. Sem metus maecenas velit vulputate
                aliquam. Senectus inceptos potenti felis pretium rutrum ipsum
                faucibus curabitur. Accumsan efficitur bibendum leo nostra dolor
                litora condimentum fames.
              </styled.p>
            </Container>
          </Flex>
          <Flex flex={1} direction="column">
            <Container w="full">
              <Box w="275px" h="275px" maxH="275px" float="left" p={2}>
                <Tableau
                  src="https://public.tableau.com/views/Superstore-EmbedDemo-AdvProfitRatioTile/Advanced-ProfitRatioTile?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link"
                  hideTabs
                  onFirstInteractive={profitRatioHandleOnFirstInteractive}
                  className={css({
                    w: "275px",
                    maxW: "275px",
                    h: "275px",
                    maxH: "275px",
                  })}
                  id="tableauViz_ProfitRatioSummary"
                />
              </Box>
              <styled.p whiteSpace="pre-wrap">
                <styled.span
                  fontSize="xl"
                  fontWeight="bold"
                  color="blue.500"
                  display="block"
                >
                  Profit Ratio Summary
                </styled.span>
                Lorem ipsum odor amet, consectetuer adipiscing elit. Venenatis
                at lorem gravida blandit diam nascetur neque. Habitant morbi
                nisl sit arcu pharetra sed libero. Per eget nisi non quam nisl.
                Fermentum nibh eleifend curae nascetur curae orci auctor dis.
                Sit quisque massa non nascetur eu. Vitae lobortis ex egestas
                himenaeos morbi tristique sollicitudin. Tempor libero vulputate
                penatibus fames, inceptos justo iaculis litora. <br />
                <br />
                Vehicula in torquent aliquam facilisi vel magna senectus proin
                quam. Massa taciti sodales sociosqu nisl natoque consectetur.
                Lobortis ante nam libero magnis, pretium placerat. Felis est
                placerat conubia convallis cursus est. Lectus bibendum eros
                malesuada bibendum per pulvinar ligula quis justo. Ipsum cras
                suspendisse ac quis faucibus erat quisque. Curae orci cras nec
                fermentum viverra ultrices est. Sodales magnis eleifend natoque
                auctor efficitur leo. Ultrices efficitur sapien fames metus,
                sollicitudin accumsan magna feugiat finibus. <br />
                <br />
                Donec id conubia odio sem porttitor. Posuere ullamcorper ad nec
                cursus sed parturient. Vehicula neque parturient ex scelerisque
                dignissim curabitur augue ut. Praesent potenti egestas eros
                imperdiet amet nisl interdum accumsan accumsan. Suspendisse
                lacinia libero ullamcorper sodales lacinia pharetra tellus
                hendrerit. Leo ut primis etiam sem nostra suscipit posuere.
                Viverra aliquam maecenas adipiscing ullamcorper pharetra
                efficitur. Nascetur feugiat dis justo eget litora pellentesque.
                Vivamus tortor odio aptent molestie quis porta. Risus viverra
                augue luctus at sagittis massa nullam. Adipiscing natoque
                suscipit nibh at dictumst. Sem metus maecenas velit vulputate
                aliquam. Senectus inceptos potenti felis pretium rutrum ipsum
                faucibus curabitur. Accumsan efficitur bibendum leo nostra dolor
                litora condimentum fames.
              </styled.p>
            </Container>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Advanced;
