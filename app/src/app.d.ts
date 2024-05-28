// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}

interface CodeSnippetInput {
	title: string
	language: string
	code: string
}

interface CodeSnippet {
	title: string
	language: string
	code: string
	favorite: boolean
	// userCreated : User, createdOn: string
}

interface HarvestInterface {
	comments: string;
	favorite: boolean;
	id: string;
	grower: Grower;
	farm: Farm;
	client: Client;
	commodity: Commodity;
	variety: Variety;
	createdAt: string;
  }

interface Grower {
	id: string;
	name: string;
	lastName: string;
	email: string;
  }
  
  interface Farm {
	id: string;
	name: string;
	address: string;
  }
  
  interface Client {
	id: string;
	name: string;
	lastName: string;
	email: string;
  }
  
  interface Commodity {
	id: string;
	name: string;
  }
  
  interface Variety {
	id: string;
	name: string;
  }