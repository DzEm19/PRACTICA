export function TrendChart() {
  const bars = [24, 34, 30, 42, 38, 52, 64, 58, 75, 72, 86, 80];

  return (
    <div className="panel large-panel">
      <div className="panel-header">
        <h3>TIEMPOS DE ATENCIÓN</h3>
        <button type="button" className="mini-btn">Ver detalle</button>
      </div>

      <div className="chart-box">
        <div className="grid-lines" />
        <div className="bars">
          {bars.map((height, index) => (
            <span key={index} style={{ height: `${height}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
