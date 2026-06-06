import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/** Zachytí chyby při renderu a zobrazí nouzové UI místo bílé obrazovky. */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("AstroConnect — chyba při renderu:", error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-canvas px-6 text-center">
        <p className="font-serif text-3xl text-ink">Něco se pokazilo</p>
        <p className="max-w-md text-sm text-muted">
          Aplikaci se nepodařilo zobrazit. Zkus prosím obnovit stránku.
        </p>
        <button
          type="button"
          onClick={this.handleReload}
          className="mt-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-2.5 text-[13px] font-semibold text-white transition-transform hover:scale-[1.03]"
        >
          Obnovit stránku
        </button>
      </div>
    );
  }
}
