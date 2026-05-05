import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif', color: '#b91c1c', background: '#fef2f2', borderRadius: '8px', margin: '2rem' }}>
          <strong>Fehler beim Laden der App:</strong>
          <pre style={{ marginTop: '1rem', fontSize: '0.85rem', whiteSpace: 'pre-wrap' }}>
            {this.state.error.message}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}
