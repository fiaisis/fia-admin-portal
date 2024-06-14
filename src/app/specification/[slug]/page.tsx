import EditorHeader from "@/components/EditorHeader";
import InstrumentList from "@/components/InstrumentList";
import TextEditor from "@/components/TextEditor";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";

export const dynamicParams = false;
const API_BASE_ENDPOINT = "http://127.0.0.1:8000";

export async function getInstruments() {
  const res = await fetch(`${API_BASE_ENDPOINT}/instrument`);
  const result = await res.json();

  return result;
}

// whilst API changes are pending, extraction of names is required
function extract_instrument_names(instruments) {
  return instruments.map((element) => element["instrument_name"]).sort();
}

// removing the `export` allows calls to internal api route
async function generateStaticParams() {
  const instruments = await getInstruments();
  return instruments.map((instrument) => {
    return { slug: instrument };
  });
}

export default async function SpecificationEditor({ params }) {
  const instrument = params.slug;
  const instruments = await getInstruments();

  const instrument_names = extract_instrument_names(instruments);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          objectFit: "contains",
          height: "75vh",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <InstrumentList
            selected={instrument}
            instruments={instrument_names}
          />
        </Box>
        <Box sx={{ flex: 7 }}>
          <EditorHeader title={instrument} />
          <Divider
            sx={{
              height: 10,
              borderTopWidth: 2,
            }}
          ></Divider>
          <TextEditor />
        </Box>
      </Box>
    </>
  );
}
