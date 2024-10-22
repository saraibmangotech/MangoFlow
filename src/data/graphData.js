import React from 'react';
import { MarkerType } from '@xyflow/react';

export const nodes = [
  { id: '1', data: { label: 'ABC Group' }, position: { x: 500, y: 50 }, type: 'input', style: { backgroundColor: '#0c1317', padding: 10, borderRadius: 5, color: 'white' } },

  { id: '2', data: { label: 'ABC Investment LLC (Rating: 2C)\nAED 204 Mio (GC Term Loan + PFE)' }, position: { x: 300, y: 150 }, style: { backgroundColor: '#a3a5a3', padding: 10, borderRadius: 5, color: 'white' } },
  { id: '2a', data: { label: 'Associates' }, position: { x: 100, y: 300 }, style: { backgroundColor: '#a3a5a3', padding: 10, borderRadius: 5, color: 'white' } },
 
  { id: '2c', data: { label: 'Subsidaries' }, position: { x: 300, y: 300 }, style: { backgroundColor: '#a3a5a3', padding: 10, borderRadius: 5, color: 'white' } },
  { id: '2b', data: { label: 'Joint Ventures' }, position: { x: 620, y: 300 }, style: { backgroundColor: '#a3a5a3', padding: 10, borderRadius: 5, color: 'white' } },

  { id: '3', data: { label: 'ABC Development Ltd.' }, position: { x: 750, y: 150 }, style: { backgroundColor: '#a3a5a3', padding: 10, borderRadius: 5, color: 'white' } },
  { id: '4', data: { label: 'Various Hospitality Investments' }, position: { x: 750, y: 220 }, style: { backgroundColor: '#092e65', padding: 10, borderRadius: 5, color: 'white' } },

  { id: '5', data: { label: 'Other Businesses of Mr. ABC' }, position: { x: 1150, y: 150 }, style: { backgroundColor: '#a3a5a3', padding: 10, borderRadius: 5, color: 'white' } },
  { id: '6', data: { label: '123 LLC (Rating: 2E)\nAED 100 Mio TR Limits' }, position: { x: 300, y: 350 }, style: { backgroundColor: '#0c1317', padding: 10, borderRadius: 5, color: 'white' } },

  { id: '7', data: { label: '234 LLC (Rating: 2E)\nAED 3 Mio Non Funded WC Limits' }, position: { x: 100, y: 550 }, style: { backgroundColor: '#0c1317', padding: 10, borderRadius: 5, color: 'white' } },
  { id: '8', data: { label: '345 LLC (Rating: 2E)' }, position: { x: 280, y: 550 }, style: { backgroundColor: '#0c1317', padding: 10, borderRadius: 5, color: 'white' } },

  { id: '9', data: { label: '456 LLC' }, position: { x: 280, y: 620 }, style: { backgroundColor: '#0c1317', padding: 10, borderRadius: 5, color: 'white' } },

  { id: '11', data: { label: '678 LLC (Rating: 2P)\nAED 80.6 Mio WC Limits' }, position: { x: 620, y: 550 }, style: { backgroundColor: '#0c1317', padding: 10, borderRadius: 5, color: 'white' } },
  { id: '12', data: { label: 'GHI LLC (Rating: 3A)\nAED 6.5 Mio WC Limits' }, position: { x: 1150, y: 550 }, style: { backgroundColor: '#0c1317', padding: 10, borderRadius: 5, color: 'white' } },

  { id: '13', data: { label: 'Engineering' }, position: { x: 1150, y: 420 }, style: { backgroundColor: '#092e65', padding: 10, borderRadius: 5, color: 'white' } },
  { id: '14', data: { label: 'Building/Maintenance' }, position: { x: 620, y: 420 }, style: { backgroundColor: '#092e65', padding: 10, borderRadius: 5, color: 'white' } },
  { id: '15', data: { label: 'JV with GHI BV Company' }, position: { x: 980, y: 450 }, style: { backgroundColor: '#a2a19b', padding: 10, borderRadius: 5, color: 'white' } },
  { id: '16', data: { label: 'JV with XYZ Shipyard' }, position: { x: 780, y: 450 }, style: { backgroundColor: '#a2a19b', padding: 10, borderRadius: 5, color: 'white' } },
  { id: '17', data: { label: 'Retail FMCG' }, position: { x: 100, y: 450 }, style: { backgroundColor: '#092e65', padding: 10, borderRadius: 5, color: 'white' } },
  { id: '18', data: { label: 'Wholesale FMCG' }, position: { x: 400, y: 450 }, style: { backgroundColor: '#092e65', padding: 10, borderRadius: 5, color: 'white' } },
  
  { id: '19', data: { label: '567 LLC' }, position: { x: 450, y: 550 }, style: { backgroundColor: '#0c1317', padding: 10, borderRadius: 5, color: 'white' } },
];


export const edges = [
  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep', label: 'Corporate Guarantee',  style: { stroke: 'black' } },
  { id: 'e1-3', source: '1', target: '3', type: 'smoothstep',  style: { stroke: 'black' } },
  { id: 'e1-5', source: '1', target: '5', type: 'smoothstep',  style: { stroke: 'black' } },
  { id: 'e3-4', source: '3', target: '4', type: 'smoothstep',  style: { stroke: 'black' } },

  { id: 'e2-2a', source: '2', target: '2a', type: 'smoothstep',  style: { stroke: 'black' } },
  { id: 'e2-2b', source: '2', target: '2b', type: 'smoothstep',  style: { stroke: 'black' } },
  { id: 'e2-2c', source: '2', target: '2c', type: 'smoothstep',  style: { stroke: 'black' } },

  { id: 'e15-12', source: '15', target: '12', type: 'smoothstep', label: '100%',  style: { stroke: 'black' } },

  { id: 'e10-11', source: '10', target: '11', type: 'smoothstep', label: '53%',  style: { stroke: 'black' } },
  { id: 'e16-11', source: '16', target: '11', type: 'smoothstep', label: '53%',  style: { stroke: 'black' } },
  { id: 'e13-12', source: '13', target: '12', type: 'smoothstep', label: '53%',  style: { stroke: 'black' } },
  { id: 'e5-13', source: '5', target: '13', type: 'smoothstep', label: '53%',  style: { stroke: 'black' } },
  { id: 'e2b-14', source: '2b', target: '14', type: 'smoothstep', label: '53%',  style: { stroke: 'black' } },
  { id: 'e14-11', source: '14', target: '11', type: 'smoothstep', label: '53%',  style: { stroke: 'black' } },
  { id: 'e7-17', source: '17', target: '7', type: 'smoothstep', label: '53%',  style: { stroke: 'black' } },
  { id: 'e6-17', source: '6', target: '17', type: 'smoothstep', label: '53%',  style: { stroke: 'black' } },
  { id: 'e6-18', source: '6', target: '18', type: 'smoothstep', label: '53%',  style: { stroke: 'black' } },
  { id: 'e8-18', source: '18', target: '8', type: 'smoothstep', label: '53%',  style: { stroke: 'black' } },
  { id: 'e9-18', source: '8', target: '9', type: 'smoothstep', label: '53%',  style: { stroke: 'black' } },
  { id: 'e18-19', source: '18', target: '19', type: 'smoothstep', label: '53%',  style: { stroke: 'black' } },
];


