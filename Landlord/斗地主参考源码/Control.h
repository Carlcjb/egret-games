#pragma once
#include "Game.h"
#include "Method.h"
class CControl :
	public CGame
	{
	public:
		void LMouseMove(CGame * ,const POINT& );//����ƶ�
		void LButtonDown(CGame * ,const POINT&);//��굥��
		void LButtonUp(CGame * ,const POINT&);//��굥��
		bool RButtonDown(CGame *);
		
		void CControl::ForceHost(CGame *member);//ǿ����

		void ComputerSendCard(CGame *member);//������ҳ���

		bool IsHostSend(CGame *);//�ж��Ƿ����ɵ�������
		bool IsHostDown(CGame *);//�ж��Ƿ��ڵ������¼�
		CControl(void);
	public:
		CMethod m_member;
		CARDTYPE  m_cardType;
		~CControl(void);
	};
