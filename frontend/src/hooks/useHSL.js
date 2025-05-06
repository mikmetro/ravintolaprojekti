const useHSL = () => {
  async function fetchItemData(endpoint, options = {}) {
    const response = await fetch(`${endpoint}`, options);

    const data = await response.json();
    const json = {
      statusCode: response.status,
      data,
    };
    return json;
  }

  const getRoute = async (fromLat, fromLon) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'digitransit-subscription-key': import.meta.env.VITE_HSL_API_KEY,
      },
      body: JSON.stringify({
        query: `
        {
          plan(
            from: { lat: ${fromLat}, lon: ${fromLon} }
            to: { lat: 60.239015434954474, lon: 25.09243834803171 }
            numItineraries: 3
            ) {
            itineraries {
              duration
              startTime
              endTime
              legs {
                mode
                startTime
                endTime
                from {
                  name
                  stop {
                    gtfsId
                    code
                    name
                  }
                }
                to {
                  name
                  stop {
                    gtfsId
                    code
                    name
                  }
                }
                route {
                  shortName
                  longName
                }
              }
            }
          }
        }
      `,
      }),
    };
    const result = await fetchItemData(
      'https://api.digitransit.fi/routing/v2/hsl/gtfs/v1',
      fetchOptions
    );
    return result;
  };

  return {
    getRoute,
  };
};

export {useHSL};
