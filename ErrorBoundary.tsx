import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReset = () => {
    // Clear legacy
    localStorage.removeItem('aethertable_gamestate');
    
    // Clear IndexedDB
    const req = window.indexedDB.deleteDatabase('AetherTableDB');
    
    req.onsuccess = () => window.location.reload();
    req.onerror = () => window.location.reload();
    req.onblocked = () => window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-screen bg-slate-950 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-red-900/50 rounded-lg p-8 max-w-md w-full shadow-2xl text-center">
            <div className="flex justify-center mb-4">
                <div className="p-3 bg-red-900/20 rounded-full">
                    <AlertTriangle size={48} className="text-red-500" />
                </div>
            </div>
            <h1 className="text-xl font-bold text-slate-200 mb-2">Critical Failure</h1>
            <p className="text-slate-400 mb-6 text-sm">
              The application encountered an unexpected error. The weave of magic has tangled.
            </p>
            <div className="bg-slate-950 p-4 rounded border border-slate-800 text-left mb-6 overflow-auto max-h-32 custom-scrollbar">
                <code className="text-xs text-red-400 font-mono block whitespace-pre-wrap">
                    {this.state.error?.message || 'Unknown Error'}
                </code>
            </div>
            <button
              onClick={this.handleReset}
              className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-3 rounded flex items-center justify-center gap-2 transition"
            >
              <RefreshCw size={18} /> Hard Reset & Reload
            </button>
            <p className="mt-4 text-[10px] text-slate-600">
                Warning: This will clear your current campaign data.
            </p>
          </div>
        </div>
      );
    }

    return (this as any).props.children || null;
  }
}