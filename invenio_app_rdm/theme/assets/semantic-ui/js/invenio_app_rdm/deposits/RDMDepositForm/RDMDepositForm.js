// This file is part of InvenioRDM
// Copyright (C) 2020 CERN.
// Copyright (C) 2020 Northwestern University.
//
// Invenio App RDM is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

import _get from "lodash/get";
import React, { Component, createRef } from "react";
import { Button, Card, Grid, Icon, Ref, Sticky } from "semantic-ui-react";
import {
  AccessRightField,
  ComingSoonField,
  CreatibutorsField,
  DatesField,
  DepositFormApp,
  FormFeedback,
  DeleteButton,
  DepositFormTitle,
  DescriptionsField,
  FileUploader,
  FundingField,
  IdentifiersField,
  LanguagesField,
  PublishButton,
  PublicationDateField,
  PublisherField,
  ResourceTypeField,
  SaveButton,
  SubjectsField,
  TitlesField,
  RelatedWorksField,
  VersionField,
  LicenseField,
} from "react-invenio-deposit";
import { AccordionField } from "react-invenio-forms";

export class RDMDepositForm extends Component {
  constructor(props) {
    super(props);
    this.config = props.config || {};

    // TODO: retrieve from backend
    this.config["canHaveMetadataOnlyRecords"] = true;

    // TODO: Make ALL vocabulary be generated by backend.
    // Currently, some vocabulary is generated by backend and some is
    // generated by frontend here. Iteration is faster and abstractions can be
    // discovered by generating vocabulary here. Once happy with vocabularies,
    // then we can generate it in the backend.
    this.vocabularies = {
      access: {
        access_right: this.config.vocabularies.access_right,
      },
      metadata: {
        ...this.config.vocabularies,

        titles: {
          ...this.config.vocabularies.titles,
        },

        descriptions: {
          type: [
            { text: "Abstract", value: "abstract" },
            { text: "Methods", value: "methods" },
            { text: "Series Information", value: "seriesinformation" },
            { text: "Table of Contents", value: "tableofcontents" },
            { text: "Technical Info", value: "technicalinfo" },
            { text: "Other", value: "other" },
          ],
        },

        creators: {
          type: [
            { text: "Person", value: "personal" },
            { text: "Organization", value: "organizational" },
          ],
          role: [
            { text: "Editor", value: "editor" },
            { text: "Data Curator", value: "datacurator" },
            { text: "Data Manager", value: "datamanager" },
            { text: "Project Manager", value: "projectmanager" },
          ],
        },

        contributors: {
          type: [
            { text: "Person", value: "personal" },
            { text: "Organization", value: "organizational" },
          ],
          role: [
            { text: "Editor", value: "editor" },
            { text: "Data Curator", value: "datacurator" },
            { text: "Data Manager", value: "datamanager" },
            { text: "Project Manager", value: "projectmanager" },
          ],
        },

        dates: {
          type: [
            { text: "Accepted", value: "accepted" },
            { text: "Available", value: "available" },
            { text: "Copyrighted", value: "copyrighted" },
            { text: "Collected", value: "collected" },
            { text: "Created", value: "created" },
            { text: "Issued", value: "issued" },
            { text: "Submitted", value: "submitted" },
            { text: "Updated", value: "updated" },
            { text: "Valid", value: "valid" },
            { text: "Withdrawn", value: "withdrawn" },
            { text: "Other", value: "other" },
          ],
        },

        // TODO: Replace with an API backend
        funding: {
          funder: [
            {
              name: "National Institutes of Health (US)",
              identifier: "funder1",
              scheme: "funderScheme1",
            },
            {
              name: "European Commission (EU)",
              identifier: "funder2",
              scheme: "funderScheme2",
            },
          ],
          award: [
            {
              title: "CANCER &AIDS DRUGS--PRECLIN PHARMACOL/TOXICOLOGY",
              number: "N01CM037835-016",
              identifier: "awardA",
              scheme: "awardSchemeA",
              parentScheme: "funderScheme1",
              parentIdentifier: "funder1",
            },
            {
              title:
                "Beyond the Standard Model at the LHC and with Atom Interferometers.",
              number: "228169",
              identifier: "awardB1",
              scheme: "awardSchemeB",
              parentScheme: "funderScheme2",
              parentIdentifier: "funder2",
            },
            {
              title: "ENvironmental COnditions in GLAucoma Patients",
              number: "747441",
              identifier: "awardB2",
              scheme: "awardSchemeB",
              parentScheme: "funderScheme2",
              parentIdentifier: "funder2",
            },
          ],
        },

        related_identifiers: {
          resource_type: this.config.vocabularies.resource_type,
          scheme: [
            { text: "ARK", value: "ark" },
            { text: "ARXIV", value: "arxiv" },
            { text: "BIBCODE", value: "bibcode" },
            { text: "DOI", value: "doi" },
            { text: "EAN13", value: "ean13" },
            { text: "EISSN", value: "eissn" },
            { text: "HANDLE", value: "handle" },
            { text: "IGSN", value: "igsn" },
            { text: "ISBN", value: "isbn" },
            { text: "ISSN", value: "issn" },
            { text: "ISTC", value: "istc" },
            { text: "LISSN", value: "lissn" },
            { text: "LSID", value: "lsid" },
            { text: "PMID", value: "pmid" },
            { text: "PURL", value: "purl" },
            { text: "UPC", value: "upc" },
            { text: "URL", value: "url" },
            { text: "URN", value: "urn" },
            { text: "W3ID", value: "w3id" },
          ],
          relations: [
            { text: "Is cited by", value: "iscitedby" },
            { text: "Cites", value: "cites" },
            { text: "Is suplement to", value: "issupplementto" },
            { text: "Is suplemented by", value: "issupplementedby" },
            { text: "Is continued by", value: "iscontinuedby" },
            { text: "Continues", value: "continues" },
            { text: "Is described by", value: "isdescribedby" },
            { text: "Describes", value: "describes" },
            { text: "Has metadata", value: "hasmetadata" },
            { text: "Is metadata for", value: "ismetadatafor" },
            { text: "Has version", value: "hasversion" },
            { text: "Is version of", value: "isversionof" },
            { text: "Is new version of", value: "isnewversionof" },
            { text: "Is previous version of", value: "ispreviousversionof" },
            { text: "Is part of", value: "ispartof" },
            { text: "Has part", value: "haspart" },
            { text: "Is referenced by", value: "isreferencedby" },
            { text: "References", value: "references" },
            { text: "Is documented by", value: "isdocumentedby" },
            { text: "Documents", value: "documents" },
            { text: "Is compiled by", value: "iscompiledby" },
            { text: "Compiles", value: "compiles" },
            { text: "Is variant form of", value: "isvariantformof" },
            { text: "Is original form of", value: "isoriginalformof" },
            { text: "Is identical to", value: "isidenticalto" },
            { text: "Is reviewed by", value: "isreviewedby" },
            { text: "Reviews", value: "reviews" },
            { text: "Is derived from", value: "isderivedfrom" },
            { text: "Is source of", value: "issourceof" },
            { text: "Is required by", value: "isrequiredby" },
            { text: "Requires", value: "requires" },
            { text: "Is obsoleted by", value: "isobsoletedby" },
            { text: "Obsoletes", value: "obsoletes" },
          ],
        },
        subjects: {
          options: [
            {
              text: "Deep Learning",
              value: {
                subject: "Deep Learning",
                scheme: "user",
                identifier: "U1",
              },
            },
            {
              text: "MeSH: Cognitive Neuroscience",
              value: {
                subject: "Cognitive Neuroscience",
                scheme: "mesh",
                identifier: "D000066494",
              },
            },
            {
              text: "FAST: Glucagonoma",
              value: {
                subject: "Glucagonoma",
                scheme: "fast",
                identifier: "943672",
              },
            },
          ],
          limitToOptions: [
            { text: "All", value: "all" },
            { text: "MeSH", value: "mesh" },
            { text: "FAST", value: "fast" },
          ],
        },
      },
    };
  }

  contextRef = createRef();
  accordionStyle = { header: { className: "inverted brand" } };

  render() {
    return (
      <DepositFormApp
        config={this.config}
        record={this.props.record}
        files={this.props.files}
      >
        <DepositFormTitle />
        <Grid>
          <Grid.Row>
            <Grid.Column width={12}>
              <FormFeedback fieldPath="message" />
              <AccordionField
                fieldPath=""
                active={true}
                label={"Files"}
                ui={this.accordionStyle}
              >
                <FileUploader
                  isDraftRecord={!this.props.record.is_published}
                  quota={{
                    maxFiles: 100,
                    maxStorage: 10 ** 10,
                  }}
                />
              </AccordionField>

              <AccordionField
                fieldPath=""
                active={true}
                label={"Identifiers"}
                ui={this.accordionStyle}
              >
                {/* <IdentifiersField /> */}
                <ComingSoonField
                  fieldPath="metadata.identifiers"
                  label="Identifier(s)"
                  labelIcon="barcode"
                />
                <br />
              </AccordionField>

              <AccordionField
                fieldPath=""
                active={true}
                label={"Basic Information"}
                ui={this.accordionStyle}
              >
                <ResourceTypeField
                  options={this.vocabularies.metadata.resource_type}
                  required
                />
                <TitlesField
                  options={this.vocabularies.metadata.titles}
                  required
                />
                <PublicationDateField required />
                <CreatibutorsField
                  label={"Creators"}
                  labelIcon={"user"}
                  fieldPath={"metadata.creators"}
                  roleOptions={this.vocabularies.metadata.creators.role}
                  schema="creators"
                  required
                />
                <CreatibutorsField
                  addButtonLabel={"Add contributor"}
                  label={"Contributors"}
                  labelIcon={"user plus"}
                  fieldPath={"metadata.contributors"}
                  roleOptions={this.vocabularies.metadata.contributors.role}
                  schema="contributors"
                  modal={{
                    addLabel: "Add contributor",
                    editLabel: "Edit contributor",
                  }}
                />
                <DescriptionsField
                  options={this.vocabularies.metadata.descriptions}
                />
                <LicenseField
                  // TODO: configure the searchEndpoint
                  searchConfig={{
                    searchApi: {
                      axios: {
                        headers: {
                          Accept: "application/json",
                        },
                        url: "/api/vocabularies/licenses",
                        withCredentials: false,
                      },
                    },
                    initialQueryState: {
                      filters: [["type", "recommended"]],
                    },
                  }}
                />
                <br />
              </AccordionField>

              <AccordionField
                fieldPath=""
                active={true}
                label={"Recommended Information"}
                ui={this.accordionStyle}
              >
                {/* <SubjectsField
                  initialOptions={_get(
                    this.props.record,
                    "metadata.subjects",
                    null
                  )}
                  limitToOptions={
                    this.vocabularies.metadata.subjects.limitToOptions
                  }
                /> */}
                <ComingSoonField
                  fieldPath="metadata.subjects"
                  label="Subjects"
                  labelIcon="tag"
                />

                {/* <LanguagesField
                  initialOptions={_get(
                    this.props.record,
                    "metadata.languages",
                    null
                  )}
                  serializeSuggestions={(suggestions) =>
                    suggestions.map((item) => ({
                      text: item.metadata.title[this.config.current_locale],
                      value: item.id,
                      key: item.id,
                    }))
                  }
                /> */}
                <ComingSoonField
                  fieldPath="metadata.languages"
                  label="Languages"
                  labelIcon="globe"
                />

                <DatesField options={this.vocabularies.metadata.dates} />
                <VersionField />
                <PublisherField />
                <br />
              </AccordionField>

              <AccordionField
                fieldPath=""
                active={true}
                label={"Funding"}
                ui={this.accordionStyle}
              >
                {/* <FundingField options={this.vocabularies.metadata.funding} /> */}
                <ComingSoonField
                  fieldPath="metadata.funding"
                  label="Awards"
                  labelIcon="money bill alternate outline"
                />

                <br />
              </AccordionField>

              <AccordionField
                fieldPath=""
                active={true}
                label={"Related works"}
                ui={this.accordionStyle}
              >
                <RelatedWorksField
                  options={this.vocabularies.metadata.related_identifiers}
                />
                <br />
              </AccordionField>
            </Grid.Column>

            <Ref innerRef={this.contextRef}>
              <Grid.Column width={4}>
                <Sticky context={this.contextRef} offset={20}>
                  <Card className="actions">
                    <Card.Content>
                      <SaveButton fluid className="save-button" />
                      <PublishButton fluid />
                    </Card.Content>
                  </Card>

                  <Card className="actions">
                    <Card.Content>
                      <DeleteButton
                        fluid
                        // TODO: make is_published part of the API response
                        //       so we don't have to do this
                        isPublished={this.props.record.is_published}
                      />
                    </Card.Content>
                  </Card>

                  <AccessRightField
                    label={"Protection"}
                    labelIcon={"shield"}
                    options={this.vocabularies.access.access_right}
                  />

                  <Grid.Row centered>
                    <Button className="disabled contact-support">
                      <Icon name="mail outline" />
                      Contact Support
                    </Button>
                  </Grid.Row>
                </Sticky>
              </Grid.Column>
            </Ref>
          </Grid.Row>
        </Grid>
      </DepositFormApp>
    );
  }
}
