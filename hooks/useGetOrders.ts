import { AppDispatch, RootState } from "@store";
import { handlePendingOrders } from "@store/globalSlice";
import { PendingOrdersFetchResponse } from "@types";
import axios from "axios";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";

function useGetOrders(
  endpoint: string,
  page: number,
  getData: boolean,
  setGetData: Dispatch<SetStateAction<boolean>>,
  sideStatus: { side: number; status: number }
): boolean {
  const { apiLink, accessToken, userDetails, isLoggedIn } = useSelector(
    (state: RootState) => state.global
  );
  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState<PendingOrdersFetchResponse>({
    count: 0,
    orders: [],
  });

  const getOrders = useCallback(async () => {
    setLoading(true);

    try {
      const { credentials } = userDetails;
      const response = await axios.post(
        apiLink + endpoint,
        {
          credentialsToken: credentials,
          page: page,
          side: sideStatus.side,
          status: sideStatus.status,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      const { data }: { data: PendingOrdersFetchResponse } = response;
      dispatch(handlePendingOrders({ status: sideStatus.status, data: data }));
      setPageData(data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }, [userDetails, page, endpoint, getData]);

  useEffect(() => {
    if (isLoggedIn && getData) {
      getOrders();
      setGetData(false);
    }
  }, [getOrders, isLoggedIn, getData, setGetData]);
  return loading;
}

export default useGetOrders;
