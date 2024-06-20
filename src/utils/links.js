import { HiLockOpen } from "react-icons/hi";
import { VscServerProcess } from "react-icons/vsc";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

const orderProgress = [
  {
    name: "open",
    Icon: HiLockOpen,
    id: 1,
    color: "blue",
  },
  {
    name: "processing",
    Icon: VscServerProcess,
    id: 2,
    color: "orange",
  },
  {
    name: "fulfilled",
    Icon: IoCheckmarkDoneCircle,
    id: 3,
    color: "green",
  },
];

const state = [
  { label: "Select State", code: "", id: 0 },
  { label: "Abia", code: "Abia", id: 1 },
  { label: "Abuja - FCT", code: "Abuja", id: 2 },
  { label: "Adamawa", code: "Adamawa", id: 3 },
  { label: "Akwa Ibom", code: "Akwa Ibom", id: 4 },
  { label: "Anambra", code: "Anambra", id: 5 },
  { label: "Lagos", code: "Lagos", id: 6 },
  { label: "Ogun", code: "Ogun", id: 7 },
  { label: "Oyo", code: "Oyo", id: 8 },
  { label: "Osun", code: "Osun", id: 9 },
  { label: "Imo", code: "Imo", id: 10 },
];

export { orderProgress, state };
