import { Flex } from "#/jsx";
import Link from "next/link";
import { PropsWithChildren } from "react";

const ShowcaseLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Flex w="full" direction="column">
      <Flex
        direction="row"
        justifyContent="flex-end"
        px={4}
        py={2}
        gap={12}
        bg="slate.100"
        borderBottom="1px solid token(colors.slate.200)"
      >
        <Link href="./">Home</Link>
        <Link href="./simple">Simple Embed</Link>
        <Link href="./improved">Improved Embed</Link>
        <Link href="./advanced">Advanced</Link>
      </Flex>
      <Flex direction="column" w="full">
        {children}
      </Flex>
    </Flex>
  );
};

export default ShowcaseLayout;
