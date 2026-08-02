import http from 'k6/http';
import { check, sleep } from 'k6';

// 1. Load test configuration options
export const options = {
  // Defines Virtual User (VU) ramp-up, stay, and ramp-down stages
  stages: [
    { duration: '5s', target: 5 },   // Ramp-up: scale up from 0 to 5 VUs over 5 seconds
    { duration: '10s', target: 5 },  // Steady state: maintain 5 concurrent VUs for 10 seconds
    { duration: '5s', target: 0 },   // Ramp-down: scale down to 0 VUs over 5 seconds
  ],
  // Performance SLAs / Thresholds
  thresholds: {
    http_req_failed: ['rate<0.01'],   // Error rate must be under 1%
    http_req_duration: ['p(95)<500'], // 95% of requests must respond within 500ms
  },
};

// 2. Virtual User execution block
export default function () {
  const url = 'https://jsonplaceholder.typicode.com/users';

  // Send GET request to fetch users
  const response = http.get(url);

  // Validate response status and payload content
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response has users array': (r) => r.json().length > 0,
  });

  // Pacing: Pause execution for 1 second between virtual user iterations
  sleep(1);
}