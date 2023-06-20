import bullsEye from "../assets/bulls-eye.webp";
import thumbsUp from "../assets/thumbs-up.webp";
import meh from "../assets/meh.webp";
import { Image, ImageProps } from "@chakra-ui/react";

interface Props {
  rating: number;
}

const Emoji = ({ rating }: Props) => {
  if (rating < 3) return null;

  const emojiMap: { [key: number]: ImageProps } = {
    // [key:numaber] 是 ts 中的索引签名，表示对象中的索引类型是任意数字
    3: { src: meh, alt: "meh", boxSize: "25px" },
    4: { src: thumbsUp, alt: "thumbsUp", boxSize: "25px" },
    5: { src: bullsEye, alt: "bullsEye", boxSize: "35px" },
  };
  return <Image {...emojiMap[rating]} mt={1} />; // 把 rating 作为数组的索引，从而根据不同的 rating，渲染不同的 emoji
};

export default Emoji;
