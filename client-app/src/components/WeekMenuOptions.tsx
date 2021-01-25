import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";
import { useTags } from "../hooks/useTags";

interface Props {
  hasChanged: boolean;
  weekSize: number;
  preferredTags: { tags: string[] };
  setWeekSize: React.Dispatch<React.SetStateAction<number>>;
  setPreferredTags: React.Dispatch<React.SetStateAction<{ tags: string[] }>>;
  swapAll: () => void;
  resetChoices: () => void;
}

export const WeekMenuOptions: React.FC<Props> = (props) => {
  const { data: tagData, loading: tagLoading, empty: tagEmpty } = useTags();

  return (
    <React.Fragment>
      <Wrap spacing={2} justify="space-around" width="100%">
        <WrapItem>
          <FormControl>
            <FormLabel>Weeklength</FormLabel>
            <Box pt={2}>
              <HStack spacing={2}>
                <Text>{props.weekSize}</Text>
                <Slider
                  aria-label="week length"
                  colorScheme="pink"
                  min={1}
                  max={7}
                  value={props.weekSize}
                  onChange={(value: number) => props.setWeekSize(value)}
                  defaultValue={5}
                  minW="100px"
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </HStack>
            </Box>
          </FormControl>
        </WrapItem>
        <WrapItem>
          <FormControl>
            <FormLabel>Preferred tags</FormLabel>
            <HStack>
              <Select
                placeholder="Select tags"
                onChange={(e) => {
                  props.setPreferredTags((preferredTags) => {
                    return { tags: [...preferredTags.tags, e.target.value] };
                  });
                }}
              >
                {!tagLoading &&
                  !tagEmpty &&
                  tagData!.map((tag) => (
                    <option key={tag.id} value={tag.name}>
                      {tag.name}
                    </option>
                  ))}
              </Select>
            </HStack>
          </FormControl>
        </WrapItem>
        <WrapItem alignItems="center">
          <Box pr={2}>
            <Button
              onClick={() => {
                props.resetChoices();
                props.swapAll();
              }}
              variant="outline"
            >
              Reset
            </Button>
          </Box>
          <Box>
            <Button
              {...(props.hasChanged && { colorScheme: "pink" })}
              onClick={() => props.swapAll()}
            >
              Swap all
            </Button>
          </Box>
        </WrapItem>
      </Wrap>

      <HStack spacing={4}>
        {props.preferredTags &&
          props.preferredTags.tags.length > 0 &&
          props.preferredTags.tags.map((tag: string, i: number) => (
            <Tag
              key={i}
              size="lg"
              borderRadius="full"
              variant="solid"
              colorScheme="green"
            >
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton
                onClick={() =>
                  props.setPreferredTags((preferredTags) => {
                    return {
                      tags: [
                        ...preferredTags!.tags.slice(0, i),
                        ...preferredTags!.tags.slice(i + 1),
                      ],
                    };
                  })
                }
              />
            </Tag>
          ))}
      </HStack>
    </React.Fragment>
  );
};
