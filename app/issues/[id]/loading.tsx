import { Box, Card, Flex } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingDetailsPage = () => {
  return (
    <Box>
      <Skeleton className="max-w-xl"/>
      <Flex className="space-x-4" my="3">
        <Skeleton width="4rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton count={4} />
      </Card>
    </Box>
  );
};

export default LoadingDetailsPage;
