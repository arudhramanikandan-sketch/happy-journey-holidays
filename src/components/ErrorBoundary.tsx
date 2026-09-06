import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn('[Application Error Boundary caught error]:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: null });
    try {
      if (typeof window !== 'undefined') {
        if (window.history && window.history.pushState) {
          window.history.pushState({}, '', '/');
        }
        window.location.hash = '';
      }
    } catch {
      // ignore
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#000B18] text-white flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="bg-[#001529] border border-[#002b54] p-8 rounded-3xl max-w-md shadow-2xl space-y-4">
            <div className="w-14 h-14 mx-auto bg-orange-500/10 rounded-2xl flex items-center justify-center text-2xl border border-[#F27D26]/20">
              ✈️
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">Happy Journey Holidays</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              We encountered a temporary interface issue. Please click below to reload your travel planner.
            </p>
            <button
              onClick={this.handleReset}
              className="bg-[#F27D26] hover:bg-[#d96c1e] text-white font-bold py-3 px-6 rounded-xl transition shadow-lg text-sm cursor-pointer"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
