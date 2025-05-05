import React from 'react';
import './Timeline.css';

const modeIcons = {
  WALK: '🚶',
  BUS: '🚍',
  TRAM: '🚊',
  SUBWAY: '🚇',
  RAIL: '🚆',
  FERRY: '⛴️',
};

const modeLabels = {
  WALK: 'Kävele',
  BUS: 'Bussi',
  TRAM: 'Raitiovaunu',
  SUBWAY: 'Metro',
  RAIL: 'Juna',
  FERRY: 'Lautta',
};

const translateStopName = (name) => {
  if (name === 'Origin') return 'Sijaintisi';
  if (name === 'Destination') return 'Perillä!';
  return name;
};

const Timeline = ({route}) => {
  if (!route || !route.legs) return <div>Reittitietoja ei saatavilla.</div>;

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('fi-FI', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="timeline">
      <div className="timeline-header">
        <div>
          <strong>Matkan alku:</strong> {formatTime(route.startTime)}
        </div>
        <div>
          <strong>Matkan loppu:</strong> {formatTime(route.endTime)}
        </div>
        <div>
          <strong>Kesto:</strong> {Math.round(route.duration / 60)} min
        </div>
      </div>

      {route.legs.map((leg, index) => {
        const icon = modeIcons[leg.mode] || '❓';
        const label =
          leg.mode === 'WALK'
            ? modeLabels[leg.mode]
            : `${modeLabels[leg.mode] || leg.mode} ${
                leg.route?.shortName || ''
              }`.trim();

        return (
          <div key={index} className="timeline-step">
            <div className="timeline-dot" />
            <div className="timeline-content">
              <div className="timeline-mode">
                {icon} {label}
              </div>
              <div className="timeline-time">
                {formatTime(leg.startTime)} → {formatTime(leg.endTime)}
              </div>
              <div className="timeline-location">
                {translateStopName(leg.from?.name)} →{' '}
                {translateStopName(leg.to?.name)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
