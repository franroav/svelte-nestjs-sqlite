// src/lib/api/apiService.ts

import Swal from "sweetalert2";

//For the css, you can put it in main.js
import "sweetalert2/dist/sweetalert2.min.css";

const API_URL = 'http://localhost:3000/';
const API_SERVICE = 'https://testapi.onesta.farm/v1/';

async function fetchData(endpoint: string) {
	try {
		const response = await fetch(`${API_URL}${endpoint}`);
		if (!response.ok) {
			throw new Error(`Conexion incompleta: ${JSON.stringify(response)}`);
		}
		return response.json();
	} catch (error) {
		throw new Error(`Server Error: ${error}`);
	}
}

async function fetchDataFromService(endpoint: string) {
	try {
		const response = await fetch(`${API_SERVICE}${endpoint}`);
		console.log('', response);
		if (!response.ok) {
			throw new Error(`Conexion incompleta: ${JSON.stringify(response)}`);
		}
		return response.json();
	} catch (error) {
		throw new Error(`Server Error: ${error}`);
	}
}

const saveNewHarvest = async (endpoint, payload) => {
	return new Promise(async (resolve, reject) => {
		try {
			const rawResponse = await fetch(`${API_URL}${endpoint}`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			});
			const content = await rawResponse.json();
			console.log('', content);
			return resolve(content);
            
			// setTimeout(resolve, 100, "foo");
		} catch (error) {
           
			return Promise.reject(new Error(`${error}`)).then(resolved, rejected);
		}
	});
};

// const saveNewFruit = async (payload) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(resolve, 100, "foo");
//       });
// }

// const saveNewGrower = async (payload) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(resolve, 100, "foo");
//       });
// }

// const saveNewFarm = async (payload) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(resolve, 100, "foo");
//       });
// }

// const saveNewVariety = async (payload) => {

//     return new Promise((resolve, reject) => {
//         setTimeout(resolve, 100, "foo");
//       });
// }

async function insertRowNewHarvest(endpoint: string, payload: any) {
	console.log('payload', payload);
	try {
		const { client, commodity, farm, grower, variety } = payload;

		// console.log({client, commodity, farm, grower, variety} )



		let arr = [];
		arr = await Promise.all([
			await saveNewHarvest('variedades', { nombre: variety.name }),
			await saveNewHarvest('campos', { nombre: farm.name, ubicacion: farm.ddress }),
			await saveNewHarvest('agricultores', { nombre: grower.name, email: grower.email }),
			saveNewHarvest('frutas', { nombre: commodity.name }),
			saveNewHarvest('clientes', {
				nombre: client.name + ' ' + client.lastName,
				email: client.email
			}),
			saveNewHarvest('cosechas', {
                "fechaCosecha": Date.now(),
                "cantidad": 1,
              })
		]);

		// Check if any object in the array has a statusCode
		const hasError = arr.some((item) => item.statusCode && item.statusCode >= 400);
        // console.log('hasError',hasError);
		if (hasError) {
            await  Swal.fire('Cancelled', `Ocurrio un error al intentar guardar en la coleccion ${endpoint} de base de datos`, 'error');
			console.error(
				`There is an error in ${endpoint} the array:`,
				arr.find((item) => item.statusCode)
			);
		} else {

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "La Cosecha ha sido guardada!",
                showConfirmButton: false,
                timer: 1500
              });

			console.log('No errors found in the array.');
		}
		console.log('', arr);
		// const response = await fetch(`${API_SERVICE}${endpoint}`);
		// console.log("", response)
		// if (!response.ok) {
		//   throw new Error(`Conexion incompleta: ${JSON.stringify(response)}`);
		// }
		// return response.json();
	} catch (error) {
        await Swal.fire('Cancelled', 'un error ha ocurrido', 'error');
		throw new Error(`Server Error: ${error}`);
	}
}

export function getServiceData(table) {
	return fetchDataFromService(`${table}`);
}

export function getBackendService(parameter) {
	return fetchData(`${parameter}`);
}

export function saveHarvestOnBackendService(paremeter, row) {
	console.log('', row);
	return insertRowNewHarvest(paremeter, row);
}
