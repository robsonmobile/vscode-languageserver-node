/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';

import {
	RequestType0, RequestHandler0, NotificationType, NotificationHandler, HandlerResult,
	CancellationToken
} from 'vscode-jsonrpc';

export interface ProposedWorkspaceInitializeParams {
	/**
	 * The actual configured workspace folders.
	 */
	workspaceFolders: WorkspaceFolder[] | null;
}

export interface ProposedWorkspaceClientCapabilities {
	/**
	 * The client has support for workspace folders
	 */
	workspaceFolders?: boolean;
}

export interface WorkspaceFolder {
	/**
	 * The associated URI for this workspace folder.
	 */
	uri: string;

	/**
	 * The name of the workspace folder. Defaults to the
	 * uri's basename.
	 */
	name: string;
}

/**
 * The `workspace/workspaceFolders` is sent from the server to the client to fetch the open workspace folders.
 */
export namespace WorkspaceFoldersRequest {
	export const type = new RequestType0<WorkspaceFolder[] | null, void, void>('workspace/workspaceFolders');
	export type HandlerSignature = RequestHandler0<WorkspaceFolder[] | null, void>;
	export type MiddlewareSignature = (token: CancellationToken, next: HandlerSignature) => HandlerResult<WorkspaceFolder[] | null, void>;
}

/**
 * The `workspace/didChangeWorkspaceFolders` notification is sent from the client to the server when the workspace
 * folder configuration changes.
 */
export namespace DidChangeWorkspaceFoldersNotification {
	export const type = new NotificationType<DidChangeWorkspaceFoldersParams, void>('workspace/didChangeWorkspaceFolders');
	export type HandlerSignature = NotificationHandler<DidChangeWorkspaceFoldersParams>;
	export type MiddlewareSignature = (params: DidChangeWorkspaceFoldersParams, next: HandlerSignature) => void;
}

/**
 * The parameters of a `workspace/didChangeWorkspaceFolders` notification.
 */
export interface DidChangeWorkspaceFoldersParams {
	/**
	 * The actual workspace folder change event.
	 */
	event: WorkspaceFoldersChangeEvent;
}

/**
 * The workspace folder change event.
 */
export interface WorkspaceFoldersChangeEvent {
	/**
	 * The array of added workspace folders
	 */
	added: WorkspaceFolder[];

	/**
	 * The array of the removed workspace folders
	 */
	removed: WorkspaceFolder[];
}