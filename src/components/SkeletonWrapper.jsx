import { Skeleton } from "@mui/material"

const SkeletonWrapper = ({loading, list, children}) => {
  if(loading && !list) {
    return <Skeleton width={"100%"} >{children}</Skeleton>
  } else if (loading && list) {
    <>
      <Skeleton variant="text" width={"100%"} sx={{pb: 5}} />
      <Skeleton variant="text" width={"100%"} sx={{pb: 5}} />
      <Skeleton variant="text" width={"100%"} sx={{pb: 5}} />
      <Skeleton variant="text" width={"100%"} sx={{pb: 5}} />
      <Skeleton variant="text" width={"100%"} sx={{pb: 5}} />
    </>
  }

  return children;
}

export default SkeletonWrapper;