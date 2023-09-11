export interface EmployeeDTO {
  name: string;
  id: string;
  lwd?: string;
  managerDetails?: EmployeeDTO;
  githubDetails?: GithubDetailsDTO[];
  rallyDetails?: RallyDetailsDTO[];
  clarityDetails?: ClarityDetailsDTO;
  jiraEpicDetails?: JiraEpicDetailsDTO[];
}

export interface GithubDetailsDTO {
  name: string;
  repoUrl: string;
  lastUpdated: Date;
  language: string[];
}

export interface RallyDetailsDTO {
  id: string;
  featureUrl: string;
  description: string;
}

export interface ClarityDetailsDTO {
  ids: string[];
}

export interface JiraEpicDetailsDTO {
  id: string;
  name: string;
  stories: TicketDTO[];
  bugs: TicketDTO[];
}

export interface TicketDTO {
  key: string;
  description: string;
}
