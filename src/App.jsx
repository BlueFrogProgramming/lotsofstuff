import { useState, useEffect } from "react";
import {
  Authenticator,
  Button,
  Heading,
  Flex,
} from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";
/**
 * @type {import('aws-amplify/data').Client<import('../amplify/data/resource').Schema>}
 */

Amplify.configure(outputs);
const client = generateClient({
  authMode: "userPool",
});

import '@mdxeditor/editor/style.css'
import { MDXEditor, UndoRedo, BoldItalicUnderlineToggles, toolbarPlugin, InsertImage, ListsToggle, listsPlugin, imagePlugin } from '@mdxeditor/editor'

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
ModuleRegistry.registerModules([AllCommunityModule]);
import { AgGridReact } from 'ag-grid-react';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { MantineProvider } from '@mantine/core';
import { YearPicker } from '@mantine/dates';

import UnexpectedError from './UnexpectedError.jsx'

import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from "./components/ErrorFallback.jsx";
import { useAsyncErrorHandler } from './components/ErrorContext';
import { useTranslation } from "react-i18next";

export default function App() {

  const { addError } = useAsyncErrorHandler();

  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/space-mission-data.json') // Fetch data from server
        .then(result => result.json()) // Convert to JSON
        .then(rowData => setRowData(rowData)); // Update state of `rowData`
  }, [])

  const [value, setValue] = useState("")

  const CompanyLogoRenderer = ({ value }) => (
    <span style={{ display: "flex", height: "100%", width: "100%", alignItems: "center" }}>{value && <img alt={`${value} Flag`} src={`https://www.ag-grid.com/example-assets/space-company-logos/${value.toLowerCase()}.png`} style={{display: "block", width: "25px", height: "auto", maxHeight: "50%", marginRight: "12px", filter: "brightness(1.1)"}} />}<p style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{value}</p></span>
  );  

      const [rowData, setRowData] = useState([]);
      const [colDefs, setColDefs] = useState([
          { field: "mission" },
          { field: "company", cellRenderer: CompanyLogoRenderer },
          { field: "location" },
          { field: "date" },
          { field: "price", valueFormatter: params => { return '£' + params.value.toLocaleString(); } },
          { field: "successful" },
          { field: "rocket" }
      ]);

  const defaultColDef = {
    flex: 1,
    editable: true,
    filter: true
  };

  function dateChange(date) {
    if (new Date().getFullYear() - date.getFullYear() > 100 | new Date().getFullYear() - date.getFullYear() < 1 ) {
      addError("Enter a valid age")
    } else if (new Date().getFullYear() - date.getFullYear() < 13 ) {
      addError("You must be over 13")
    } else {
      setValue(date)
    }
  }

  const { t } = useTranslation()

  return (
    <Authenticator>
      {({ signOut }) => (
          <div>
            <Flex
              className="App"
              justifyContent="center"
              alignItems="center"
              direction="column"
              width="70%"
              margin="0 auto"
            >
            <Heading level={1} style={{margin: 25}}>{t('welcomeMessage')}</Heading>
            <p>MDX Rich Text Editor</p>
            <div style={{ width: '1000px', height: '500px', borderWidth: '1px', borderRadius: "5px", marginBottom: 25}}>
              <MDXEditor
                markdown="Hello world"
                plugins={[
                  imagePlugin(),
                  listsPlugin(),
                  toolbarPlugin({
                    toolbarClassName: 'my-classname',
                    toolbarContents: () => (
                      <>
                        <UndoRedo />
                        <BoldItalicUnderlineToggles />
                        <InsertImage />
                        <ListsToggle />
                      </>
                    )
                  })
                ]}
              />
            </div>
            <p>AG Grid Dynamic Table</p>
            <div style={{ height: 500, width: 1000, }}>
              <AgGridReact
                  rowData={rowData}
                  columnDefs={colDefs}
                  defaultColDef={defaultColDef}
                  pagination={true}
                  onCellValueChanged={event => console.log(`New Cell Value: ${event.value}`)}
              />
            </div>
            <h3>Mantine ui library:</h3>
            <p>When were you born?</p>
            <MantineProvider>
              <YearPicker value={value} onChange={dateChange} />
            </MantineProvider>

            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <UnexpectedError />
            </ErrorBoundary>

            <Button onClick={signOut} style={{ marginBottom: 20 }}>Sign Out</Button>
            </Flex>
          </div>
      )}
    </Authenticator>
  );
}